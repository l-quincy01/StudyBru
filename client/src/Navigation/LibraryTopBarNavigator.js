import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SummaryScreen from "../Screens/SummaryScreen";
import Flashcards from "../Screens/FlashcardsScreen";
import QuizScreen from "../Screens/QuizScreen";
import CoPilotScreen from "../Screens/CoPilotScreen";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import tw from "twrnc";

const LibraryTopBarNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex flex-row  items-center mt-2 mb-2`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notes")}
          style={tw``}
        >
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>

        <View style={tw` flex flex-row items-center justify-center `}>
          <Text style={tw`font-semibold text-md`}> Library</Text>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontStyle: "italic", fontSize: 11 },
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ fontSize: 8 }}> Home</Text>
            ),
          }}
          name="Summary"
          component={SummaryScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ fontSize: 8 }}> Home</Text>
            ),
          }}
          name="Flashcards"
          component={Flashcards}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ fontSize: 8 }}> Home</Text>
            ),
          }}
          name="Quiz"
          component={QuizScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ fontSize: 8 }}> Home</Text>
            ),
          }}
          name="CoPilot"
          component={CoPilotScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default LibraryTopBarNavigator;
