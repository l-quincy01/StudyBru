import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import SummaryScreen from "./SummaryScreen";
import Flashcards from "./FlashcardsScreen";
import QuizScreen from "./QuizScreen";
import TermsScreen from "./TermsScreen";
import MockQuestionsScreen from "./MockQuestionsScreen";

const AllResourcesScreen = ({ navigation }) => {
  const route = useRoute();

  const { location } = route.params;

  const [summaryIsActive, setSummaryIsActive] = useState();
  const [flashcardsIsActive, setFlashcardsIsActive] = useState();
  const [quizIsActive, setQuizIsActive] = useState();
  const [termsIsActive, setTermsIsActive] = useState();
  const [mockQuestionsIsActive, setMockQuestionsIsActive] = useState();

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
          setQuizIsActive(true);
          break;
        case "Terms":
          setTermsIsActive(true);
          break;
        case "Mock Questions":
          setMockQuestionsIsActive(true);
          break;
      }
    }
  }, [location]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={tw`flex flex-row items-center justify-start  mt-1 `}>
          <TouchableOpacity
            style={tw`flex flex-row items-center  justify-center p-2 `}
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
          {/* <Text style={tw`font-semibold text-lg`}> Explore Resources</Text> */}
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={tw`flex flex-row gap-x-3 items-center justify-center p-2`}
        >
          {/* <View style={tw`flex flex-row gap-x-3 items-center  justify-center `}> */}
          <TouchableOpacity
            onPress={() => {
              setSummaryIsActive(true);
              setFlashcardsIsActive(false);
              setQuizIsActive(false);
              setTermsIsActive(false);
              setMockQuestionsIsActive(false);
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
              setQuizIsActive(false);
              setTermsIsActive(false);
              setMockQuestionsIsActive(false);
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
              setQuizIsActive(true);
              setTermsIsActive(false);
              setMockQuestionsIsActive(false);
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
          <TouchableOpacity
            onPress={() => {
              setSummaryIsActive(false);
              setFlashcardsIsActive(false);
              setQuizIsActive(false);
              setTermsIsActive(true);
              setMockQuestionsIsActive(false);
            }}
            style={tw`rounded-2xl py-2 px-4 items-center justify-center bg-${
              termsIsActive ? "black" : "gray-200"
            }`}
          >
            <Text
              style={tw`text-${
                termsIsActive ? "white" : "black"
              } font-semibold text-md`}
            >
              Terms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSummaryIsActive(false);
              setFlashcardsIsActive(false);
              setQuizIsActive(false);
              setTermsIsActive(false);
              setMockQuestionsIsActive(true);
            }}
            style={tw`rounded-2xl py-2 px-4 items-center justify-center bg-${
              mockQuestionsIsActive ? "black" : "gray-200"
            }`}
          >
            <Text
              style={tw`text-${
                mockQuestionsIsActive ? "white" : "black"
              } font-semibold text-md`}
            >
              Questions
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </ScrollView>
      </View>

      <ScrollView style={tw`flex-1 p-5 `}>
        {summaryIsActive && <SummaryScreen />}
        {flashcardsIsActive && <Flashcards />}
        {quizIsActive && <QuizScreen />}
        {termsIsActive && <TermsScreen />}
        {mockQuestionsIsActive && <MockQuestionsScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AllResourcesScreen;
