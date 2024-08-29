import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SummaryScreen from "../Screens/SummaryScreen";
import Flashcards from "../Screens/FlashcardsScreen";
import QuizScreen from "../Screens/QuizScreen";
import CoPilotScreen from "../Screens/CoPilotScreen";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import tw from "twrnc";

const LibraryTopBarNavigator = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex flex-row items-center mt-1 mb-1`}>
        <TouchableOpacity
          style={tw`flex flex-row items-center  justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={28} color="black" />

          <Text style={tw`font-semibold text-lg`}> Library</Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontStyle: "italic", fontSize: 11 },
        }}
      >
        <Tab.Screen
          name="Summary"
          component={SummaryScreen}
          options={{
            title: "Summary",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="notes" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Flashcards"
          component={Flashcards}
          options={{
            title: "Flashcard",
            tabBarIcon: ({ color }) => (
              <Entypo name="documents" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            title: "Quiz",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="brain" size={24} color="black" />
            ),
          }}
        />
        {/* <Tab.Screen
          name="CoPilot"
          component={CoPilotScreen}
          options={{
            title: "CoPilot",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="robot-outline"
                size={24}
                color="black"
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default LibraryTopBarNavigator;
