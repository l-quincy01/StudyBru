import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Pressable, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { QuizContext } from "../config/QuizContext";
import tw from "twrnc";
import axios from "axios";

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

const AddNotes = () => {
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
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`flex flex-col px-5`}>
        <Text style={tw`text-2xl`}>Choose the file format of your notes</Text>
        <Pressable
          onPress={pickDocument}
          style={tw`border-2  mt-10 pl-4 pr-5 py-1 rounded-xl flex flex-row justify-between `}
        >
          <Text style={tw`text-black text-lg`}>PDF</Text>
          <AntDesign name="pdffile1" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={pickDocument}
          style={tw`border-2  mt-10 pl-4 pr-5 py-1 rounded-xl flex flex-row justify-between `}
        >
          <Text style={tw`text-black text-lg`}>Word Document</Text>
          <Foundation name="page-doc" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={pickDocument}
          style={tw`border-2  mt-10 pl-4 pr-5 py-1 rounded-xl flex flex-row justify-between `}
        >
          <Text style={tw`text-black text-lg`}>PowerPoint Presentation</Text>
          <FontAwesome name="file-powerpoint-o" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={pickDocument}
          style={tw`border-2  mt-10 pl-4 pr-5 py-1 rounded-xl flex flex-row justify-between `}
        >
          <Text style={tw`text-black text-lg`}>Text File</Text>
          <Entypo name="text-document" size={24} color="black" />
        </Pressable>
      </View>
      <Pressable
        onPress={pickDocument}
        style={tw`bg-black mt-10 pl-4 pr-5 py-1 rounded-xl flex flex-row justify-between `}
      >
        <Text
          style={tw`text-white text-lg font-semibold`}
          onPress={() => generateQuiz(notes)}
        >
          Generate Quiz
        </Text>
      </Pressable>
    </View>
  );
};

export default AddNotes;
