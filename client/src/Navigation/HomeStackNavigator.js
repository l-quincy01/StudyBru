import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProfileScreen from "../Screens/ProfileScreen";
import SplashScreen from "../Screens/SplashScreen";

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

      {/* <Stack.Screen name="Summaries" component={MagicNotes} /> */}
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
