import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import EndScreen from "../Screens/EndScreen";
import MagicNotes from "../Screens/MagicNotes";

const Stack = createNativeStackNavigator();

function MagicNotesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Flash Cards" component={MagicNotes} />
    </Stack.Navigator>
  );
}

export default MagicNotesStack;
