import React, { useState, useRef, useContext } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";
import { AntDesign } from "@expo/vector-icons";
//import { flashCards } from "../config/FlashCards";

const Flashcards = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flashCardSide, setFlashCardSide] = useState(false);
  const { flashCards } = useContext(FlashCardsContext);
  const progress =
    flashCards.length > 0 ? (currentQuestionIndex + 1) / flashCards.length : 0;

  const flipAnim = useRef(new Animated.Value(0)).current;
  const flipDeg = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const flipDegBack = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const handleNext = () => {
    if (currentQuestionIndex < flashCards.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFlashCardSide(false);
      flipAnim.setValue(0);
    } else {
      navigation.navigate("Quiz");
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setFlashCardSide(false);
      flipAnim.setValue(0);
    } else {
      navigation.navigate("Splash");
    }
  };

  const handleFlashCardSides = () => {
    Animated.timing(flipAnim, {
      toValue: flashCardSide ? 0 : 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setFlashCardSide(!flashCardSide);
  };

  const currentCard = flashCards[currentQuestionIndex];

  if (!flashCards || flashCards.length === 0) {
    return (
      <>
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
      </>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`flex-1 flex-col items-center justify-center p-5`}>
          <View style={tw`flex-row top-5 absolute `}>
            <View style={tw`flex-1`}>
              <Progress.Bar
                progress={progress}
                width={null}
                height={20}
                color="green"
              />
            </View>
          </View>
          <Pressable onPress={handleFlashCardSides} style={tw`mt-20 `}>
            <View style={styles.flashCardContainer}>
              <Animated.View
                style={[
                  styles.flashCard,
                  {
                    transform: [{ rotateY: flipDeg }],
                    zIndex: flashCardSide ? 0 : 1,
                  },
                ]}
              >
                <Text style={tw`text-center font-medium text-lg`}>
                  {currentCard.front}
                </Text>
              </Animated.View>
              <Animated.View
                style={[
                  styles.flashCard,
                  {
                    transform: [{ rotateY: flipDegBack }],
                    zIndex: flashCardSide ? 1 : 0,
                    position: "absolute",
                    top: 0,
                  },
                ]}
              >
                <Text style={tw`text-center font-medium text-lg`}>
                  {currentCard.back}
                </Text>
              </Animated.View>
            </View>
          </Pressable>
          <View style={tw`items-center justify-between flex flex-row w-full`}>
            <Pressable onPress={handlePrev} style={tw`p-5`}>
              <FontAwesome5 name="chevron-left" size={24} color="black" />
            </Pressable>
            <Pressable onPress={handleNext} style={tw`p-5`}>
              <FontAwesome5 name="chevron-right" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flashCardContainer: {
    width: 300,
    height: 400,
  },
  flashCard: {
    height: 400,
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden",
  },
});

export default Flashcards;
