import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import quizIcon from "../../assets/splash.png";
import tw from "twrnc";
import axios from "axios";
import { QuizContext } from "../config/QuizContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SummaryContext } from "../config/SummaryContext";
import CheckBox from "../Components/CheckBox";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GetStartedComponent from "../Components/GetStartedComponent";
import { Avatar } from "react-native-paper";
import HomeComponent from "../Components/HomeComponent";

function removeTripleBackticks(text) {
  // Use a regular expression to replace triple backticks with an empty string
  return text.replace(/```/g, "");
}

// function to parse the text response into an array of objects for flashcards
function parseFlashCards(inputString) {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " "); // Remove line breaks and extra spaces
  const flashCardBlocks = inputString.match(/\{[^}]+\}/g); // Split the string into individual flashcard blocks
  const result = []; // Array to hold the result objects
  flashCardBlocks.forEach((block) => {
    const frontMatch = block.match(/front: "(.*?)"/);
    const backMatch = block.match(/back: "(.*?)"/);

    if (frontMatch && backMatch) {
      const front = frontMatch[1];
      const back = backMatch[1];
      result.push({ front, back }); //push Front and Back objects into result array
    }
  });

  return result;
}

//parse the quiz into an array of objects
function parseQuiz(inputString) {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " "); // Remove line breaks and extra spaces
  const questionBlocks = inputString.match(/\{[^}]+\}/g); // Split the string into individual question blocks
  const result = []; // Array to hold the result objects

  questionBlocks.forEach((block) => {
    const question = block.match(/question: "(.*?)"/)[1];
    const options = block
      .match(/options: \[(.*?)\]/)[1]
      .split('", "')
      .map((option) => option.replace(/^"|"$/g, ""));
    const correctAnswer = block.match(/correctAnswer: "(.*?)"/)[1];
    result.push({ question, options, correctAnswer }); //push question, options, correctAnswer objects into result array
  });

  return result;
}

const SplashScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [notes, setNotes] = useState("");
  const [notesArray, setNotesArray] = useState("");
  const { quiz, setQuiz } = useContext(QuizContext);
  const { summary, setSummary } = useContext(SummaryContext);
  const { flashCards, setFlashCards } = useContext(FlashCardsContext);
  const [loading, setLoading] = useState(false);
  const [checkBoxVal, setCheckBoxVal] = useState([]);

  //upload document fuction. Send the document to parse api endpoint to parse the file into text
  // Function to upload the document and parse it to text
  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });

    try {
      let parseEndpoint;
      switch (file.assets[0].mimeType) {
        case "application/pdf":
          parseEndpoint = "http://192.168.68.103:3001/parse-pdf";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          parseEndpoint = "http://192.168.68.103:3001/parse-docx";
          break;
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          parseEndpoint = "http://192.168.68.103:3001/parse-pptx";
          break;
        default:
          throw new Error("Unsupported file type");
      }

      // Send the file to the appropriate parsing endpoint
      const parseResponse = await axios.post(parseEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the parsed text
      const parsedText = cleanText(parseResponse.data.text);
      setNotes(parsedText);

      // Attempt to upload the file
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
        console.log("File uploaded successfully:", uploadResponse.data);
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
      }

      console.log("File parsed and notes set successfully", parsedText);
    } catch (error) {
      console.error("Error processing file:", error);
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
      generateSummaries(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (quiz.length > 0 && flashCards.length > 0 && summary.length > 0) {
      setLoading(false);
    }
  }, [quiz, flashCards, summary]);

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
        "http://192.168.68.103:3000/generate-quiz",
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
        "http://192.168.68.103:3003/generate-flashCards",
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
  const generateSummaries = async (notes) => {
    console.log("Generating summary with these notes:", notes);

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

      const data = response.data;
      console.log(
        "Received RAW DATA Summaries",
        removeTripleBackticks(data.summary)
      );
      setSummary(removeTripleBackticks(data.summary));
    } catch (error) {
      console.error("Error generating Summary:", error);
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
            style={tw`flex flex-row items-center justify-between border-b border-gray-200  py-5 px-5`}
          >
            <View style={tw` flex flex-row gap-x-2 items-center `}>
              {/* <Entypo name="menu" size={24} color="black" /> */}
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

            {/* */}
          </ScrollView>
          {/* ONLY RENDER WHEN NOT NEW */}
          {/* <View style={tw`left-75 absolute bottom-5 `}>
            <TouchableOpacity style={tw`p-5 rounded-full bg-blue-500`}>
              <FontAwesome6 name="add" size={24} color="white" />
            </TouchableOpacity>
          </View> */}
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
