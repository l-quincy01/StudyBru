// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import tw from "twrnc";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import AddNotes from "../Screens/AddNotes";

import HomeStackNavigator from "./HomeStackNavigator";
import LibraryStackNavigator from "./LibraryStackNavigator";

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
        {/* <Tab.Screen
          name="AddNotes"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color }}> Add Notes</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="pluscircleo" size={24} color={color} />
            ),
          }}
          component={AddNotes}
        /> */}
        <Tab.Screen
          name="Notes"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color }}>Resources</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library-outline" size={24} color={color} />
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
