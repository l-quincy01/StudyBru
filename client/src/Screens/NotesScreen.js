import React, { useState, useRef, useContext } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

//import { flashCards } from "../config/FlashCards";

const NotesScreen = ({ navigation }) => {
  const { flashCards } = useContext(FlashCardsContext);

  // if (!flashCards || flashCards.length === 0) {
  //   return (
  //     <View style={tw`flex-1 items-center justify-center  p-5`}>
  //       <Text style={tw`font-semibold text-xl text-center`}>
  //         Upload Notes On Home Page To Get Started.
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={tw`bg-gray-100`}>
      <View style={tw`flex-1 flex-col px-5 gap-y-8 mt-25`}>
        <Text
          style={tw` font-medium text-4xl text-center justify-between items-center `}
        >
          We'll take notes so you don't have to.
        </Text>

        <Text style={tw`text-gray-500 text-md text-center font-light `}>
          View your summarised notes and flashcards below. Study smarter today.
        </Text>

        <View
          style={tw`flex flex-row gap-x-3 items-center justify-center mt-10  `}
        >
          <Pressable
            onPress={() => navigation.navigate("Summary")}
            style={tw` bg-white  gap-y-2 flex text-center justify-center items-center border-2 border-gray-300 py-5 px-5 rounded-xl`}
          >
            <View style={tw``}>
              <MaterialIcons name="notes" size={24} color="black" />
            </View>
            <Text style={tw`text-left font-semibold text-md`}>Summary</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Flashcards")}
            style={tw` bg-white  gap-y-2 flex text-center justify-center items-center border-2 border-gray-300 py-5 px-5 rounded-xl`}
          >
            <View style={tw``}>
              <MaterialCommunityIcons
                name="newspaper-variant-multiple-outline"
                size={24}
                color="black"
              />
            </View>
            <Text style={tw`text-left font-semibold text-md`}>Flashcards</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Quiz")}
            style={tw`  bg-white  gap-y-2 flex text-center justify-center items-center border-2 border-gray-300 py-5 px-5 rounded-xl`}
          >
            <View style={tw`px-4`}>
              <MaterialCommunityIcons name="brain" size={24} color="black" />
            </View>
            <Text style={tw`text-left font-semibold text-md`}>Quiz</Text>
          </Pressable>
        </View>
        <View style={tw`flex flex-row gap-x-3  `}>
          <Pressable
            onPress={() => navigation.navigate("Summary")}
            style={tw` bg-white  gap-y-2 flex text-center justify-center items-center border-2 border-gray-300 py-5 px-5 rounded-xl`}
          >
            <View style={tw``}>
              <MaterialCommunityIcons
                name="robot-outline"
                size={24}
                color="black"
              />
            </View>
            <Text style={tw`text-left font-semibold text-md`}>Co-Pilot</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flashCardContainer: {
    width: 300,
    height: 400,
  },
  flashCard: {
    height: 400,
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden",
  },
});

export default NotesScreen;
