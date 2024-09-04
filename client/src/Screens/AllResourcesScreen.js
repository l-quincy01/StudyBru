import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import SummaryScreen from "./SummaryScreen";
import Flashcards from "./FlashcardsScreen";
import QuizScreen from "./QuizScreen";

const AllResourcesScreen = ({ navigation }) => {
  const route = useRoute();

  const { location } = route.params;

  const [summaryIsActive, setSummaryIsActive] = useState();
  const [flashcardsIsActive, setFlashcardsIsActive] = useState();
  const [quizIsActive, seQquizIsActive] = useState();

  useEffect(() => {
    if (location) {
      switch (location) {
        case "Summary":
          setSummaryIsActive(true);
          break;
        case "Flashcards":
          setFlashcardsIsActive(true);
          break;
        case "Quiz":
          seQquizIsActive(true);
          break;
      }
    }
  }, [location]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex flex-row items-center justify-start  mt-1 mb-1`}>
        <TouchableOpacity
          style={tw`flex flex-row items-center  justify-center p-2 `}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        {/* <Text style={tw`font-semibold text-lg`}> Explore Resources</Text> */}
      </View>

      <View
        style={tw`flex flex-row gap-x-6 items-center  justify-center px-5 py-3 `}
      >
        <TouchableOpacity
          onPress={() => {
            setSummaryIsActive(true);
            setFlashcardsIsActive(false);
            seQquizIsActive(false);
          }}
          style={tw`rounded-2xl p-2 items-center justify-center bg-${
            summaryIsActive ? "black" : "gray-200"
          }`}
        >
          <Text
            style={tw`text-${
              summaryIsActive ? "white" : "black"
            } font-semibold text-md`}
          >
            {" "}
            Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSummaryIsActive(false);
            setFlashcardsIsActive(true);
            seQquizIsActive(false);
          }}
          style={tw`rounded-2xl p-2 items-center justify-center bg-${
            flashcardsIsActive ? "black" : "gray-200"
          }`}
        >
          <Text
            style={tw`text-${
              flashcardsIsActive ? "white" : "black"
            } font-semibold text-md`}
          >
            {" "}
            Flashcards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSummaryIsActive(false);
            setFlashcardsIsActive(false);
            seQquizIsActive(true);
          }}
          style={tw`rounded-2xl py-2 px-4 items-center justify-center bg-${
            quizIsActive ? "black" : "gray-200"
          }`}
        >
          <Text
            style={tw`text-${
              quizIsActive ? "white" : "black"
            } font-semibold text-md`}
          >
            Quiz
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={tw`flex-1 p-5 `}>
        {summaryIsActive && <SummaryScreen />}
        {flashcardsIsActive && <Flashcards />}
        {quizIsActive && <QuizScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllResourcesScreen;
