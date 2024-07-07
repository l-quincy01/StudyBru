import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { QuizContext } from "../config/QuizContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { flashCards } from "../config/FlashCards";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const MagicNotes = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);

  const progress =
    flashCards.length > 0 ? (currentQuestionIndex + 1) / flashCards.length : 0;

  useEffect(() => {
    if (flashCards) {
      setQuizProgress(flashCards.length);
    }
  }, [flashCards]);

  const handleNext = () => {
    if (currentQuestionIndex < flashCards.length - 1) {
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
      navigation.navigate("Splash");
    }
  };

  // if (0 === 0) {
  //   return (
  //     <View style={tw`flex-1 items-center justify-center  p-5`}>
  //       <Text style={tw`text-2xl text-center`}>
  //         Magic notes will become availble once you generate them
  //       </Text>
  //     </View>
  //   );
  // }
  return (
    //Flash Card
    <View style={tw`flex-1 flex-col items-center justify-center  p-5`}>
      <View
        // onPress={pickDocument}
        //   onPress={() => generateQuiz(notes)}
        style={tw` gap-y-3 flex text-center justify-center items-center bg-gray-200  py-2 px-5 rounded-xl`}
      >
        <Text style={tw` text-center  font-semibold text-xl`}>Front</Text>

        <Text style={tw` text-center  font-medium text-lg `}>
          Create an interactive quiz to test your knowledge. Create an
          interactive quiz to test your knowledge. Create an interactive quiz to
          test your knowledge. Create an interactive quiz to test your
          knowledge. Create an interactive quiz to test your knowledge. Create
          an interactive quiz to test your knowledge. Create an interactive quiz
          to test your knowledge. Create an interactive quiz to test your
          knowledge. Create an interactive quiz to test your knowledge. Create
          an interactive quiz to test your knowledge. Create an interactive quiz
          to test your knowledge.
        </Text>
      </View>
      <View style={tw`items-center justify-between flex flex-row w-full `}>
        <FontAwesome5 name="chevron-left" size={24} color="black" />
        <FontAwesome5 name="chevron-right" size={24} color="black" />
      </View>
    </View>
  );
};

export default MagicNotes;
