import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { questions } from "../config/question";

const QuestionsScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  return (
    <View>
      <Text>{questions[currentQuestionIndex].question}</Text>
      {/* {questions.map((item) => (
        <View>
          <Text>{item.question}</Text>
        </View>
      ))} */}
    </View>
  );
};

export default QuestionsScreen;

const styles = StyleSheet.create({});
