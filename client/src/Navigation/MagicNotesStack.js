import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import EndScreen from "../Screens/EndScreen";
import MagicNotes from "../Screens/MagicNotes";
import NotesScreen from "../Screens/NotesScreen";
import SummaryScreen from "../Screens/SummaryScreen";
import QuestionsScreen from "../Screens/QuestionsScreen";

const Stack = createNativeStackNavigator();

function MagicNotesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Flashcards" component={MagicNotes} />
      <Stack.Screen name="Quiz" component={QuestionsScreen} />
      <Stack.Screen name="End" component={EndScreen} />
      {/* <Stack.Screen name="Summaries" component={MagicNotes} /> */}
    </Stack.Navigator>
  );
}

export default MagicNotesStack;
