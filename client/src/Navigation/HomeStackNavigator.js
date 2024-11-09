import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProfileScreen from "../Screens/ProfileScreen";
import SplashScreen from "../Screens/SplashScreen";
import AddedNotesScreen from "../Screens/AddedNotesScreen";
import NotesDocumentView from "../Screens/NotesDocumentView";
// import demo from "../Screens/demo";

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Home" component={SplashScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddedNotes" component={AddedNotesScreen} />
      <Stack.Screen name="NotesDocumentView" component={NotesDocumentView} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
