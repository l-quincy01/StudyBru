import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import EndScreen from "../Screens/EndScreen";

import NotesScreen from "../Screens/NotesScreen";
import SummaryScreen from "../Screens/SummaryScreen";

import LibraryTopBarNavigator from "./LibraryTopBarNavigator";
import AllResourcesScreen from "../Screens/AllResourcesScreen";
import CoPilotScreen from "../Screens/CoPilotScreen";

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
      <Stack.Screen name="AllResourcesScreen" component={AllResourcesScreen} />
      <Stack.Screen name="CoPilot" component={CoPilotScreen} />
    </Stack.Navigator>
  );
}

export default LibraryStackNavigator;
