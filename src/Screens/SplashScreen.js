import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Pressable, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import tw from "twrnc";
import axios from "axios";
import { QuizContext } from "../config/QuizContext";
import { SafeAreaView } from "react-native-safe-area-context";

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

  //upload document fuction. Send the document to parse api endpoint to parse the file into text
  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });

    try {
      const response = await axios.post(
        "http://192.168.68.108:3001/parse-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully", cleanText(response.data.text));
      setNotes(cleanText(response.data.text));
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const cleanText = (text) => {
    // Replace multiple line breaks and spaces with a single space
    return text.replace(/\s+/g, " ");
  };
  useEffect(() => {
    console.log("Notes updated:", notes);
  }, [notes]);
  useEffect(() => {
    console.log("QUIZ OBJECT HERE :", quiz);
  }, [quiz]);

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

  // axios way, send NOTES TO OPEN  AI API TO GENERATE A QUIZ
  const generateQuiz = async (notes) => {
    console.log("Generating quiz with notes:", notes);

    try {
      const response = await axios.post(
        "http://192.168.68.108:3000/generate-quiz",
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
      console.log("Received RAW DATA DATA quiz questions:", data.questions);
      setQuiz(parseQuiz(data.questions));
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center bg-white`}>
      <Image
        source={require("../../assets/quizIcon.jpeg")}
        style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
      />

      {/* <Pressable
        style={tw`bg-green-500  pl-4 pr-5 py-1 rounded-xl`}
        title="Upload Notes"
        onPress={pickDocument}
      >
        <Text style={tw`text-white text-lg`}>Upload</Text>
      </Pressable>
      <Button
        style={tw`bg-green-500 mt-10 pl-4 pr-5 py-1 rounded-xl`}
        title="Generate Quiz"
        onPress={() => generateQuiz(notes)}
      /> */}

      <Text style={tw`text-3xl text-center font-semibold`}>
        Quiz Instructions
      </Text>

      <View
        style={tw`flex text-center justify-center items-center bg-green-500 mt-10 p-2 w-90 rounded-xl`}
      >
        <Text style={tw`text-white text-lg `}>Each Quiz has Four Options</Text>
        <Text style={tw`text-white text-lg `}>
          Progress Will Be Shown At The Top
        </Text>
        <Text style={tw`text-white text-lg `}>
          Score Will Be Shown At The End
        </Text>
      </View>

      {/* <Pressable
        onPress={() => navigation.navigate("Questions")}
        style={tw`bg-green-500 mt-10 pl-4 pr-5 py-1 rounded-xl `}
      >
        <Text style={tw`text-white text-lg`}>Start</Text>
      </Pressable> */}
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
