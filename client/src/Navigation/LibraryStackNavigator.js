import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import EndScreen from "../Screens/EndScreen";

import NotesScreen from "../Screens/NotesScreen";
import SummaryScreen from "../Screens/SummaryScreen";

import Flashcards from "../Screens/FlashcardsScreen";
import QuizScreen from "../Screens/QuizScreen";
import CoPilotScreen from "../Screens/CoPilotScreen";
import LibraryTopBarNavigator from "./LibraryTopBarNavigator";

const Stack = createNativeStackNavigator();

function LibraryStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Library" component={NotesScreen} />
      <Stack.Screen
        name="LibraryTopBarNavigator"
        component={LibraryTopBarNavigator}
      />
      <Stack.Screen name="CoPilot" component={CoPilotScreen} />
      {/* <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Flashcards" component={Flashcards} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    
      <Stack.Screen name="End" component={EndScreen} /> */}
      {/* <Stack.Screen name="Summaries" component={MagicNotes} /> */}
    </Stack.Navigator>
  );
}

export default LibraryStackNavigator;
