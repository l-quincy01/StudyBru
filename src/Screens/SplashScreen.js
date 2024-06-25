import { Image, Pressable, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import tw from "twrnc";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { PDFDocument } from "pdf-lib";

const SplashScreen = ({ navigation }) => {
  const [notes, setNotes] = useState("");
  const [quiz, setQuiz] = useState([]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();

      if (result.name.endsWith(".pdf")) {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();
        let text = "";
        for (const page of pages) {
          text += page
            .getTextContent()
            .items.map((item) => item.str)
            .join(" ");
        }
        setNotes(text);
      } else {
        const text = await response.text();
        setNotes(text);
      }
    }
  };

  const generateQuiz = async () => {
    const response = await fetch("/generate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    });
    const quiz = await response.json();
    setQuiz(quiz);
    console.log(quiz);
  };

  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/quizIcon.jpeg")}
        style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
      />

      <Button title="Upload Notes" onPress={pickDocument} />
      <Button title="Generate Quiz" onPress={generateQuiz} />
      {/*Quiz Heading */}
      <Text style={tw`text-3xl text-center font-semibold`}>
        {" "}
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
