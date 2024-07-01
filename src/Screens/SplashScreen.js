import React, { useEffect, useState } from "react";
import { View, Text, Button, Pressable, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import tw from "twrnc";
import axios from "axios";

const SplashScreen = ({ navigation }) => {
  const [notes, setNotes] = useState("");
  const [quiz, setQuiz] = useState([]);

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

  // useEffect(() => {
  //   console.log("Notes updated:", notes);
  // }, [notes]);

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

  // const generateQuiz = async () => {
  //   console.log("Generating quiz with notes:", notes);

  //   const response = await fetch("http://192.168.68.108:3000/generate-quiz", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ notes: notes }),
  //   });
  //   const data = await response.json();
  //   setQuiz(data.questions);
  //   console.log("Received quiz questions:", data.questions);
  // };

  // axios way
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

      const data = response.data;
      setQuiz(data.questions);
      console.log("Received quiz questions:", data.questions);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  function parseQuestions(input) {
    // Removing the 'questions:' part and any leading/trailing whitespace
    let cleanedInput = input.replace(/questions:\s*{/, "{").trim();

    // Wrapping the cleaned input in array brackets
    cleanedInput = "[" + cleanedInput + "]";

    // Replacing newlines and indentation for correct JSON formatting
    cleanedInput = cleanedInput.replace(/},\s*\n\s*{/g, "},{");

    // Parsing the string into an array of objects
    const questions = eval(cleanedInput);

    return questions;
  }

  // Parsing the questions
  const questions = parseQuestions(inputString);

  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/quizIcon.jpeg")}
        style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
      />

      <Button title="Upload Notes" onPress={pickDocument} />
      <Button title="Generate Quiz" onPress={generateQuiz} />

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

      <Pressable
        onPress={() => navigation.navigate("Questions")}
        style={tw`bg-green-500 mt-10 pl-4 pr-5 py-1 rounded-xl `}
      >
        <Text style={tw`text-white text-lg`}>Start</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
