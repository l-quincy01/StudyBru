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
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SummaryContext } from "../config/SummaryContext";
import CheckBox from "../Components/CheckBox";

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

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  //upload document fuction. Send the document to parse api endpoint to parse the file into text
  const uploadDocument = async (file) => {
    console.log("hier so:" + file.assets[0].mimeType);
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
  const generateSummaries = async (notes) => {
    console.log("Generating summary with these notes:", notes);

    try {
      const response = await axios.post(
        "http://172.20.10.7:3004/generate-summary",
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
    <SafeAreaView style={tw`flex-1  px-5 bg-gray-100`}>
      {loading ? (
        <View
          style={[tw`justify-center items-center`, styles.loadingContainer]}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text style={tw`text-3xl text-left font-semibold`}>Home</Text>
            <TouchableOpacity onPress={navigation.navigate("Profile")}>
              <AntDesign name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={tw`flex-1`}>
            <View style={tw`flex flex-col`}></View>

            <View style={tw`flex-1  `}>
              {/*Headline */}
              <Text
                style={tw` mt-10 font-medium text-4xl text-center justify-between items-center`}
              >
                Summarise Your Classes With Ease!
              </Text>

              {/*Document icons */}
              <View style={tw`flex flex-col gap-y-2 items-center mt-4 mb-1`}>
                <View
                  style={tw`flex flex-row gap-x-4 items-center justify-center`}
                >
                  <Image
                    source={require("../../assets/pdfIcon.png")}
                    style={tw.style(tw``)}
                  />
                  <Image
                    source={require("../../assets/docIcon.png")}
                    style={tw.style(tw``)}
                  />
                </View>

                <Image
                  source={require("../../assets/underlineIcon.png")}
                  style={tw.style(tw``)}
                />
              </View>

              {/*Small explanation */}
              <Text
                style={tw`text-gray-500 text-md text-center font-light mt-2 `}
              >
                Effortlessly transform heavy course material into focused
                summaries, flashcards and interactive quizzes.
              </Text>

              {/*SAVED NOTES VIEW */}

              {/* <Pressable
                onPress={() => navigation.navigate("Summary")}
                style={tw` bg-white  gap-y-2 flex text-center justify-center items-center border-2 border-gray-300 py-5 px-5 rounded-xl`}
              >
                <View style={tw``}>
                  <Ionicons name="library-outline" size={24} color="black" />
                </View>
                <Text style={tw`text-left font-semibold text-md`}>
                  Your Library
                </Text>
              </Pressable> */}

              {/* 

            <View
              style={tw` bg-white flex flex-col border-2 border-gray-300  rounded-xl mt-5 p-2`}
            >
              <View style={tw` px-2 gap-y-2 flex flex-col  `}>
                <View style={tw`flex flex-row items-center justify-between`}>
                  <Text style={tw`text-lg font-semibold `}>
                    Heading of Notes
                  </Text>

                  <AntDesign name="checkcircle" size={24} color="black" />
                </View>
                <Text style={tw`text-xs font-light`}>
                  Effortlessly transform heavy course material into focused
                  summaries, flashcards and interactive quizzes.
                </Text>

                <View style={tw`flex flex-row justify-between items-center`}>
                  <Text style={tw`text-xs font-light`}>
                    Date Created: {formattedDate}
                  </Text>
                  <Entypo name="documents" size={24} color="black" />
                </View>
              </View>
               <CheckBox
                notesArr = {notesArray}
                checkedValues={checkBoxVal}
                onChange={setCheckBoxVal}
              /> 
              <View style={tw`border-t-4 border-green-200 bottom-0 `}></View> 
            </View> */}

              {/*DOCUMENT PICKER */}

              <View style={tw`text-left my-5`}>
                <Text style={tw`text-xl font-semibold`}>
                  Here's how to get started
                </Text>
              </View>
              <TouchableOpacity
                onPress={pickDocument}
                style={tw` bg-blue-500 text-white gap-y-2 flex text-center justify-center items-center py-3 px-5 rounded-xl`}
              >
                <View style={tw`p-2`}>
                  <AntDesign name="addfile" size={24} color="white" />
                </View>
                <Text style={tw`text-left font-semibold text-md text-white`}>
                  Upload Material
                </Text>

                <Text style={tw`text-center font-light text-xs text-white`}>
                  Compatible with all your study material. Choose .pdf, .docx,
                  .pptx
                </Text>
                {/* <View style={tw`flex flex-col items-center`}>
                  <AntDesign name="addfile" size={24} color="black" />
                  <Text style={tw`text-left font-semibold text-md`}>
                    Select A File
                  </Text>
                  <Text style={tw`text-left font-light text-xs`}>
                    .pdf, .docx, .pptx
                  </Text>
                </View> */}
              </TouchableOpacity>
              <View style={tw`text-left my-5 gap-y-5`}>
                <Text style={tw`text-lg text-gray-400 font-semibold`}>
                  Recently Viewed
                </Text>

                <View style={tw`justify-center items-center`}>
                  {false ? ( //Will make a condition to be set to true if user has notes uploaded
                    <Text style={tw`font-semibold text-md `}>
                      Nothing added.
                    </Text>
                  ) : (
                    <TouchableOpacity
                      style={tw`flex flex-row gap-x-8 items-center bg-gray-200 rounded-lg py-4 px-2`}
                    >
                      <AntDesign name="pptfile1" size={32} color="black" />
                      <View style={tw`flex flex-col gap-y-2`}>
                        <Text style={tw`text-md font-semibold`}>
                          CS Complier Notes
                        </Text>
                        <Text style={tw`text-md font-medium text-gray-500`}>
                          Date created {formattedDate}
                        </Text>
                      </View>
                      <View style={tw`ml-4`}>
                        <Entypo
                          name="chevron-small-right"
                          size={24}
                          color="black"
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* <Pressable
                onPress={pickDocument}
                style={tw` bg-white  gap-x-5 flex flex-row  items-center border-2 border-gray-300 p-5 w-full rounded-xl`}
              >
                <Ionicons name="documents-outline" size={34} color="black" />

                <Text style={tw` text-lgtext-left font-semibold text-md`}>
                  Upload Your Study Material
                </Text>
              </Pressable> */}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
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
