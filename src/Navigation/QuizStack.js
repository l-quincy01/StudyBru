import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import QuestionsScreen from "../Screens/QuestionsScreen";
import EndScreen from "../Screens/EndScreen";

const Stack = createNativeStackNavigator();

function QuizStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Questions" component={QuestionsScreen} />
      <Stack.Screen name="End" component={EndScreen} />
    </Stack.Navigator>
  );
}

export default QuizStack;
