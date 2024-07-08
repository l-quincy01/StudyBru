import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import tw from "twrnc";
import axios from "axios";
import { QuizContext } from "../config/QuizContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

function parseFlashCards(inputString) {
  // Remove line breaks and extra spaces
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");

  // Split the string into individual flashcard blocks
  const flashCardBlocks = inputString.match(/\{[^}]+\}/g);

  // Array to hold the result objects
  const result = [];

  flashCardBlocks.forEach((block) => {
    const frontMatch = block.match(/front: "(.*?)"/);
    const backMatch = block.match(/back: "(.*?)"/);

    if (frontMatch && backMatch) {
      const front = frontMatch[1];
      const back = backMatch[1];
      result.push({ front, back });
    }
  });

  return result;
}

//parse the quiz into an array of objects
function parseQuiz(inputString) {
  // Remove line breaks and extra spaces
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");

  // Split the string into individual question blocks
  const questionBlocks = inputString.match(/\{[^}]+\}/g);

  // Array to hold the result objects
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
  const [notes, setNotes] = useState("");
  const { quiz, setQuiz } = useContext(QuizContext);
  const { flashCards, setFlashCards } = useContext(FlashCardsContext);
  const [loading, setLoading] = useState(false);

  //upload document fuction. Send the document to parse api endpoint to parse the file into text
  const uploadDocument = async (file) => {
    console.log("ashee:" + file.assets[0].mimeType);
    const formData = new FormData();
    formData.append("file", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });

    try {
      if (file.assets[0].mimeType === "application/pdf") {
        const response = await axios.post(
          "http://172.20.10.7:3001/parse-pdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(
          "File uploaded successfully",
          cleanText(response.data.text)
        );
        setNotes(cleanText(response.data.text));
      }
      if (
        file.assets[0].mimeType ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const response = await axios.post(
          "http://172.20.10.7:3001/parse-docx",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(
          "File uploaded successfully",
          cleanText(response.data.text)
        );
        setNotes(cleanText(response.data.text));
      }
      if (
        file.assets[0].mimeType ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        const response = await axios.post(
          "http://172.20.10.7:3001/parse-pptx",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(
          "File uploaded successfully",
          cleanText(response.data.text)
        );
        setNotes(cleanText(response.data.text));
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const cleanText = (text) => {
    // Replace multiple line breaks and spaces with a single space
    return text.replace(/\s+/g, " ");
  };

  useEffect(() => {
    if (notes) {
      setLoading(true);
      generateQuiz(notes);
      generateFlashCards(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (quiz.length > 0) {
      setLoading(false);
    }
  }, [quiz, flashCards]);

  // useEffect(() => {
  //   console.log("Notes updated:", notes);
  // }, [notes]);

  // useEffect(() => {
  //   console.log("QUIZ OBJECT HERE :", quiz);
  // }, [quiz]);

  //calls the upload document function once a file has been chosen
  const pickDocument = async () => {
    console.log("Document picker opened");
    let result = await DocumentPicker.getDocumentAsync({});
    console.log("Document picker result:", result);

    if (result.assets[0].uri) {
      console.log(
        "Document has successfully been picked from devices storage with a valid uri"
      );

      try {
        uploadDocument(result);
      } catch (error) {
        console.error("Error extracting text from document:", error);
      }
    } else {
      console.log("Document picker cancelled or failed");
    }
  };
  // QUIZ FUNCTION
  // axios way, send NOTES TO OPEN  AI API TO GENERATE A QUIZ
  const generateQuiz = async (notes) => {
    // console.log("Generating quiz with notes:", notes);

    try {
      const response = await axios.post(
        "http://172.20.10.7:3000/generate-quiz",
        {
          notes: notes,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //set quiz from the response
      const data = response.data;
      // console.log("Received RAW DATA DATA quiz questions:", data.questions);
      setQuiz(parseQuiz(data.questions));
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };
  /// FLASHCARDS FUNCTION
  // axios way, send NOTES TO OPEN  AI API TO GENERATE FLASHCARDS
  const generateFlashCards = async (notes) => {
    console.log("Generating flashcards with these notes:", notes);

    try {
      const response = await axios.post(
        "http://172.20.10.7:3003/generate-flashCards",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Received RAW DATA DATA FLASH-CARDS:", data.flashCards);
      setFlashCards(parseFlashCards(data.flashCards));
    } catch (error) {
      console.error("Error generating FLASHCARDS:", error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 gap-y-10 p-5 bg-white`}>
      {loading ? (
        <View style={tw` w-full h-full  flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={tw`flex-1`}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <Text style={tw`text-3xl text-left font-semibold`}>
                Study Buddy
              </Text>
              <Ionicons
                name="information-circle-outline"
                size={30}
                color="black"
              />
            </View>
            <Text style={tw`text-gray-500 text-md text-left font-light mt-2`}>
              Convert your lecture notes into quizzes to test your knowledge and
              improve your studying
            </Text>
          </View>
          <View style={tw`flex-1 items-center`}>
            <Image
              source={require("../../assets/quizIcon.jpeg")}
              style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
            />
            <View
              style={tw`flex flex-col gap-y-5 px-15 justify-between items-center`}
            >
              <Pressable
                onPress={pickDocument}
                style={tw`gap-y-3 flex text-center justify-center items-center border border-gray-200 py-3 px-5 rounded-xl`}
              >
                <View style={tw`p-5`}>
                  <FontAwesome6
                    name="wand-magic-sparkles"
                    size={24}
                    color="black"
                  />
                </View>
                <Text style={tw`text-left font-semibold text-md`}>
                  Create Magic Notes
                </Text>

                <Text style={tw`text-center font-light text-xs`}>
                  Get amazing flashcards and interactive quizzes to test your
                  knowledge.
                </Text>
                <View style={tw`flex flex-col items-center`}>
                  <AntDesign name="addfile" size={24} color="black" />
                  <Text style={tw`text-left font-semibold text-md`}>
                    Select A File
                  </Text>
                  <Text style={tw`text-left font-light text-xs`}>
                    .pdf, .docx, .pptx
                  </Text>
                </View>
              </Pressable>
              <Text style={tw`font-semibold  text-md`}>
                Your AI study companion.
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
