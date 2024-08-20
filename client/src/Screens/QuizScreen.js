import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { QuizContext } from "../config/QuizContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const QuizScreen = ({ navigation }) => {
  const { quiz } = useContext(QuizContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizProgress, setQuizProgress] = useState(0);

  useEffect(() => {
    if (quiz) {
      setQuizProgress(quiz.length);
    }
  }, [quiz]);

  const progress =
    quiz.length > 0 ? (currentQuestionIndex + 1) / quiz.length : 0;

  console.log("Quiz data:", quiz);
  console.log("Current question index:", currentQuestionIndex);

  const handleOptionPress = (clickedOption) => {
    setSelectedOption(clickedOption);
    const isAnswerRight =
      clickedOption === quiz[currentQuestionIndex].correctAnswer;
    setIsCorrect(isAnswerRight);
    if (isAnswerRight) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      navigation.navigate("End", { userScore: score });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigation.navigate("Flash Cards");
    }
  };

  if (!quiz || quiz.length === 0) {
    return (
      <SafeAreaView style={tw`flex-1  bg-gray-100`}>
        <ScrollView style={tw`bg-gray-100`}>
          <View style={tw`flex p-5 flex-col gap-y-8 `}>
            <Text style={tw`text-xl font-semibold`}>Get started</Text>
            <View
              style={tw` mt-5 bg-white p-5 gap-y-5 items-center justify-center rounded-xl`}
            >
              <FontAwesome5 name="file-pdf" size={36} color="black" />

              <TouchableOpacity
                // onPress={pickDocument}
                style={tw`bg-blue-500 p-3 flex flex-row justify-center items-center gap-x-2 rounded-xl`}
              >
                <AntDesign name="upload" size={24} color="white" />

                <Text style={tw`text-white `}>Upload Notes</Text>
              </TouchableOpacity>

              <Text style={tw`text-black `}>
                Compatible with pdf, .docx, .pptx
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-2xl`}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {/*View wraps  (1)PROGRESS BAR, (2)HEADING OF QUESTION AND (3)SELECT OPTIONS*/}
        <View style={tw`mt-2 p-5`}>
          {/* For progress bar */}
          <View style={tw`flex-row `}>
            <View style={tw`flex-1 `}>
              <Progress.Bar
                progress={progress}
                width={null}
                height={20}
                color="green"
              />
            </View>
          </View>

          {/* Heading of the question */}
          <Text style={tw`text-lg`}>{currentQuestion.question} </Text>

          {/* Select options*/}
          <View>
            {currentQuestion.options.map((option, idx) => (
              <Pressable
                key={idx}
                onPress={() => handleOptionPress(option)}
                disabled={selectedOption !== null}
                style={tw`border-2 border-green-500 p-5 my-2 rounded-2xl ${
                  selectedOption === option
                    ? isCorrect
                      ? "bg-blue-200 border-blue-500"
                      : "bg-red-200 border-red-500"
                    : "border-green-500"
                }`}
              >
                <Text style={tw`text-left ml-2 text-sm font-semibold`}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* View for the buttons 'Back' and 'Next' */}
        <View style={tw`flex flex-row items-center justify-between p-5`}>
          <Pressable
            onPress={handlePrev}
            style={tw`mt-4 bg-green-500 rounded-xl px-5 py-3 w-1/4 flex items-center justify-center`}
          >
            <Text style={tw`text-white text-center text-md font-semibold`}>
              Back
            </Text>
          </Pressable>
          <Pressable
            onPress={handleNext}
            style={tw`mt-4 bg-green-500 rounded-xl px-5 py-3 w-2/5 flex items-center justify-center`}
          >
            <Text
              style={tw`text-white text-center text-md font-semibold flex-grow`}
            >
              {currentQuestionIndex === quiz.length - 1 ? "Finish" : "Next"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
