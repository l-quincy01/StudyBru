import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { TextInput } from "react-native-paper";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MockQuestionsContext } from "../config/MockQuestionsContext";

const MockQuestionsScreen = ({ navigation }) => {
  const [userAnswer, setUserAnswer] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showThatAnswer, setShowThatAnswer] = useState(null); // Store index of the answer to show
  const { questions } = useContext(MockQuestionsContext);

  if (!questions || questions.length === 0) {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={tw`flex flex-row items-center justify-start  mt-1 `}>
            <TouchableOpacity
              style={tw`flex flex-row items-center  justify-center p-2 `}
              onPress={() => navigation.goBack()}
            >
              <Entypo name="chevron-left" size={28} color="black" />
            </TouchableOpacity>
            <Text style={tw`font-semibold text-lg text-center`}>
              {" "}
              Mock Questions
            </Text>
          </View>
          <View
            style={tw`mt-30 flex flex-col gap-5 items-center justify-center`}
          >
            <Image
              source={require("../../assets/NoNotes.png")}
              style={tw`w-[120px] h-[120px]`}
            />
            <Text style={tw`mt-4 text-2xl text-center font-bold`}>
              Oops Notes Not Found! Get Started On The Homepage!
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex flex-row items-center justify-start  mt-1 `}>
        <TouchableOpacity
          style={tw`flex flex-row items-center  justify-center p-2 `}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={tw`font-semibold text-lg text-center`}>
          {" "}
          Mock Questions
        </Text>
      </View>
      <KeyboardAwareScrollView extraHeight={140}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={tw`flex-1 p-5 `}>
            {questions.map((item, index) => (
              <View key={index} style={tw`flex flex-col gap-y-2 mb-5`}>
                <View>
                  <Text style={tw`font-semibold text-lg`}>{item.question}</Text>

                  <View style={tw`items-center flex flex-row justify-end`}>
                    {showThatAnswer === index ? (
                      <TouchableOpacity
                        onPress={() => setShowThatAnswer(null)} // Set index of question to show answer
                        style={tw`rounded-full bg-gray-100 p-1`}
                      >
                        <MaterialCommunityIcons
                          name="lightbulb-off-outline"
                          size={14}
                          color="black"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setShowThatAnswer(index)} // Set index of question to show answer
                        style={tw`rounded-full bg-gray-100 p-1`}
                      >
                        <FontAwesome
                          name="lightbulb-o"
                          size={14}
                          color="black"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {showAnswers || showThatAnswer === index ? (
                  <View style={tw`p-3 border border-gray-200 rounded-xl`}>
                    <Text style={tw`font-medium text-gray-500 text-md`}>
                      {item.answer}
                    </Text>
                  </View>
                ) : (
                  <TextInput
                    placeholderTextColor="#909090"
                    style={{ ...styles.input, height: 60 }}
                    placeholder="Enter Your Answer"
                    blurOnSubmit={false}
                    scrollEnabled={true}
                    onChange={({ nativeEvent }) => {
                      const updatedAnswers = [...userAnswer];
                      updatedAnswers[index] = nativeEvent.text;
                      setUserAnswer(updatedAnswers);
                    }}
                    multiline={true}
                    value={userAnswer[index] || ""}
                  />
                )}
              </View>
            ))}
            {showAnswers ? (
              <TouchableOpacity
                style={tw`mt-5 rounded-2xl bg-black items-center gap-3 justify-center flex flex-row p-5`}
                onPress={() => setShowAnswers(false)}
              >
                <Text style={tw`text-md font-semibold text-white`}>
                  Hide Answers
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={tw`mt-5 rounded-2xl bg-gray-500 items-center gap-3 justify-center flex flex-row p-5`}
                  disabled={true}
                >
                  <Text style={tw`text-md font-semibold text-white`}>
                    Mark My Answers
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`mt-5 rounded-2xl bg-black items-center gap-3 justify-center flex flex-row p-5`}
                  onPress={() => setShowAnswers(true)}
                >
                  <Text style={tw`text-md font-semibold text-white`}>
                    Show All Answers
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F5F5F5",
    height: "100%",
    fontFamily: "Semibold",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    maxHeight: 100,
    fontSize: 20,
    flex: 1,
    alignItems: "flex-start",
  },
});

export default MockQuestionsScreen;
