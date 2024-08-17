// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionsScreen from "../Screens/QuizScreen";
import SplashScreen from "../Screens/SplashScreen";
import tw from "twrnc";
import EndScreen from "../Screens/EndScreen";
import { QuizContext } from "../config/QuizContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import AddNotes from "../Screens/AddNotes";
import QuizStack from "./QuizStack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

import HomeStackNavigator from "./HomeStackNavigator";
import LibraryStackNavigator from "./LibraryStackNavigator";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: tw`bg-gray-100`,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Splash"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color }}> Home</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
          component={HomeStackNavigator}
        />
        <Tab.Screen
          name="Add Notes"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color }}> Scan Notes</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Feather name="camera" size={24} color="black" />
            ),
          }}
          component={AddNotes}
        />
        <Tab.Screen
          name="Notes"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color }}>Library</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="folderopen" size={24} color="black" />
            ),
          }}
          component={LibraryStackNavigator}
        />
        {/* <Tab.Screen
          name="Library"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color }}> Quiz</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="folderopen" size={24} color="black" />
            ),
          }}
          component={QuizStack}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
/**
 *   <Stack.Navigator
        screenOptions={{
          headerShown: true,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Questions" component={QuestionsScreen} />
        <Stack.Screen name="End" component={EndScreen} />
      </Stack.Navigator>
 */
