import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { questions } from "../config/question";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { generatedQuestions } from "./SplashScreen";

generatedQuestions;
const QuestionsScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizProgress, setQuizProgress] = useState(questions.length);

  const progress = (currentQuestionIndex + 1) / quizProgress;

  console.log({ isCorrect });
  console.log({ score });

  const handleOptionPress = (clickedOption) => {
    // Alert.alert(clickedOption);
    setSelectedOption(clickedOption);
    const isAnswerRight =
      clickedOption === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(isAnswerRight);
    if (isAnswerRight) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigation.navigate("End", { userScore: score });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex === 0) {
      navigation.navigate("Splash");
    }
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <View>
      <View style={tw`mt-6 p-5`}>
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
        <Text style={tw`text-2xl`}>
          {questions[currentQuestionIndex].question} ?
        </Text>
        {questions[currentQuestionIndex].options.map((option) => (
          <Pressable
            onPress={() => handleOptionPress(option)}
            disabled={selectedOption}
            style={tw`border-2 border-green-500 p-5 my-4  rounded-2xl  ${
              selectedOption === option
                ? isCorrect
                  ? "bg-blue-200 border-blue-500"
                  : " bg-red-200 border-red-500"
                : "border-green-500"
            } `}
          >
            <Text style={tw`text-left ml-2 text-lg font-semibold `}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={tw` flex flex-row items-center justify-between p-5`}>
        <Pressable
          onPress={handlePrev}
          style={tw` mt-4  bg-green-500 rounded-xl px-5 py-3 w-1/4 flex items-center justify-center `}
        >
          <Text style={tw` text-white text-center text-lg font-semibold`}>
            Back
          </Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          style={tw`  mt-4  bg-green-500 rounded-xl px-5 py-3 w-2/5 flex items-center justify-center `}
        >
          <Text
            style={tw`  text-white text-center text-lg font-semibold flex-grow `}
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({});
