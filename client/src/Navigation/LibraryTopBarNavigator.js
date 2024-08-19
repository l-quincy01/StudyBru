import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SummaryScreen from "../Screens/SummaryScreen";
import Flashcards from "../Screens/FlashcardsScreen";
import QuizScreen from "../Screens/QuizScreen";
import CoPilotScreen from "../Screens/CoPilotScreen";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";

const LibraryTopBarNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex flex-row items-center mt-2 mb-2`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notes")}
          style={tw`m`}
        >
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>

        <View style={tw`flex flex-row items-center justify-center`}>
          <Text style={tw`font-semibold text-md`}> Library</Text>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontStyle: "italic", fontSize: 11 },
          tabBarStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen
          name="Summary"
          component={SummaryScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <View style={tw`flex flex-row items-center`}>
                <AntDesign name="filetext1" size={16} color={color} />
                <Text style={tw`ml-1 text-xs`}>Summary</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Flashcards"
          component={Flashcards}
          options={{
            tabBarLabel: ({ color }) => (
              <View style={tw`flex flex-row items-center`}>
                <FontAwesome5 name="sticky-note" size={16} color={color} />
                <Text style={tw`ml-1 text-xs`}>Flashcards</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            tabBarShowLabel: true,
            tabBarLabel: ({ color }) => (
              <View style={tw`flex flex-row items-center`}>
                <Entypo name="edit" size={16} color={color} />
                <Text style={tw`ml-1 text-xs`}>QuiHz</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="CoPilot"
          component={CoPilotScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <View style={tw`flex flex-row items-center`}>
                <AntDesign name="team" size={16} color={color} />
                <Text style={tw`ml-1 text-xs`}>CoPilot</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default LibraryTopBarNavigator;
