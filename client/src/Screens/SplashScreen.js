import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import tw from "twrnc";
import axios from "axios";
import { QuizContext } from "../config/QuizContext";
import { FlashCardsContext } from "../config/FlashCardsContext";
import { SummaryContext } from "../config/SummaryContext";
import GetStartedComponent from "../Components/GetStartedComponent";
import HomeComponent from "../Components/HomeComponent";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

function removeTripleBackticks(text) {
  return text.replace(/```/g, "");
}

function parseFlashCards(inputString) {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const flashCardBlocks = inputString.match(/\{[^}]+\}/g);
  const result = [];
  flashCardBlocks.forEach((block) => {
    const frontMatch = block.match(/front: "(.*?)"/);
    const backMatch = block.match(/back: "(.*?)"/);
    if (frontMatch && backMatch) {
      result.push({ front: frontMatch[1], back: backMatch[1] });
    }
  });
  return result;
}

function parseQuiz(inputString) {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const questionBlocks = inputString.match(/\{[^}]+\}/g);
  const result = [];
  questionBlocks.forEach((block) => {
    const question = block.match(/question: "(.*?)"/)[1];
    const options = block
      .match(/options: \[(.*?)\]/)[1]
      .split('", "')
      .map((option) => option.replace(/^"|"$/g, ""));
    const correctAnswer = block.match(/correctAnswer: "(.*?)"/)[1];
    result.push({ question, options, correctAnswer });
  });
  return result;
}

const SplashScreen = ({ navigation }) => {
  const { quiz, setQuiz } = useContext(QuizContext);
  const { summary, setSummary } = useContext(SummaryContext);
  const { flashCards, setFlashCards } = useContext(FlashCardsContext);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [notesTitle, setNotesTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });

    try {
      const parseEndpoint = getParseEndpoint(file.assets[0].mimeType);
      const parseResponse = await axios.post(parseEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const parsedText = cleanText(parseResponse.data.text);
      setNotes(parsedText);
      console.log("File parsed and notes set successfully", parsedText);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });

    try {
      const uploadResponse = await axios.post(
        "http://192.168.68.103:4001/uploadNotes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { fileId } = uploadResponse.data;

      const uploadTitleResponse = await axios.post(
        "http://192.168.68.103:4001/uploadTitle",
        { fileId, title: notesTitle },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("File uploaded successfully:", uploadResponse.data);
      console.log("Title uploaded successfully:", uploadTitleResponse.data);
    } catch (uploadError) {
      console.error("Error uploading file:", uploadError);
    }
  };

  const cleanText = (text) => {
    return text.replace(/\s+/g, " ");
  };

  const getParseEndpoint = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return "http://192.168.68.103:3001/parse-pdf";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "http://192.168.68.103:3001/parse-docx";
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "http://192.168.68.103:3001/parse-pptx";
      default:
        throw new Error("Unsupported file type");
    }
  };

  useEffect(() => {
    if (notes) {
      setLoading(true);
      generateQuiz(notes);
      generateFlashCards(notes);
      generateSummaries(notes);
      generateTitle(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (quiz.length > 0 && flashCards.length > 0 && summary.length > 0) {
      setLoading(false);
    }
  }, [quiz, flashCards, summary]);

  useEffect(() => {
    if (notesTitle && selectedFile) {
      uploadFile(selectedFile);
    }
  }, [notesTitle]);

  const pickDocument = async () => {
    console.log("Document picker opened");
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.assets[0].uri) {
      console.log("Document picked successfully");
      setSelectedFile(result);
      uploadDocument(result); // Initiate document parsing
    } else {
      console.log("Document picker cancelled or failed");
    }
  };

  const generateQuiz = async (notes) => {
    try {
      const response = await axios.post(
        "http://192.168.68.103:3000/generate-quiz",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setQuiz(parseQuiz(response.data.questions));
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  const generateFlashCards = async (notes) => {
    try {
      const response = await axios.post(
        "http://192.168.68.103:3003/generate-flashCards",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFlashCards(parseFlashCards(response.data.flashCards));
    } catch (error) {
      console.error("Error generating flashcards:", error);
    }
  };

  const generateSummaries = async (notes) => {
    try {
      const response = await axios.post(
        "http://192.168.68.103:3004/generate-summary",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSummary(removeTripleBackticks(response.data.summary));
    } catch (error) {
      console.error("Error generating summary:", error);
    }
  };

  const generateTitle = async (notes) => {
    try {
      const response = await axios.post(
        "http://192.168.68.103:3006/generate-title",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNotesTitle(response.data.title);
    } catch (error) {
      console.error("Error generating title:", error);
    }
  };

  return (
    <View style={tw`flex-1 mt-12 `}>
      {loading ? (
        <View
          style={[tw`justify-center items-center`, styles.loadingContainer]}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          {/*Top view */}
          <View
            style={tw`flex flex-row items-center justify-between border-b border-gray-200 py-5 px-5`}
          >
            <View style={tw`flex flex-row gap-x-2 items-center`}>
              <SimpleLineIcons name="fire" size={24} color="black" />
              <Text style={tw`font-bold text-lg`}>0</Text>
            </View>
            <TouchableOpacity
              style={tw``}
              onPress={() => navigation.navigate("Profile")}
            >
              <AntDesign name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/*Body view */}
          <ScrollView style={tw`flex-1 px-5 bg-gray-100`}>
            {quiz.length > 0 && flashCards.length > 0 && summary.length > 0 ? (
              <HomeComponent nav={navigation} />
            ) : (
              <GetStartedComponent docPicker={pickDocument} />
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 10000,
  },
});
