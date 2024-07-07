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
  const currentCard = flashCards[currentQuestionIndex];
  return (
    //Flash Card
    <View style={tw`flex-1 flex-col items-center justify-center  p-5`}>
      <View style={tw`flex-row top-5 absolute`}>
        <View style={tw`flex-1 `}>
          <Progress.Bar
            progress={progress}
            width={null}
            height={20}
            color="green"
          />
        </View>
      </View>
      <View
        style={tw`h-[400px] w-[300px] mt-5 gap-y-3 flex text-center justify-center items-center bg-gray-200  py-2 px-5 rounded-xl`}
      >
        <Text style={tw` text-center  font-medium text-lg `}>
          {currentCard.back}
        </Text>
      </View>
      <View style={tw`items-center justify-between flex flex-row w-full `}>
        <Pressable onPress={handlePrev} style={tw`p-5`}>
          <FontAwesome5 name="chevron-left" size={24} color="black" />
        </Pressable>
        <Pressable onPress={handleNext} style={tw`p-5`}>
          <FontAwesome5 name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default MagicNotes;
