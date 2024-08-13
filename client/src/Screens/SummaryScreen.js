import React, { useState, useRef, useContext } from "react";
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Markdown from "react-native-markdown-display";
import { SummaryContext } from "../config/SummaryContext";

//import { flashCards } from "../config/FlashCards";

const SummaryScreen = ({ navigation }) => {
  const { summary } = useContext(SummaryContext);

  // if (!flashCards || flashCards.length === 0) {
  //   return (
  //     <View style={tw`flex-1 items-center justify-center  p-5`}>
  //       <Text style={tw`font-semibold text-xl text-center`}>
  //         Upload Notes On Home Page To Get Started.
  //       </Text>
  //     </View>
  //   );
  // }
  const copy = `\`${summary}\``;

  return (
    <ScrollView style={tw`bg-gray-100`}>
      <View style={tw`flex-1 flex-col p-5 gap-y-8 mt-25`}>
        {/* Summary Heading */}
        <Text style={tw`text-4xl font-semibold`}> Notes Summary</Text>
        <View style={tw`border-b border border-gray-200 w-1/2`}></View>
        {/* Buttons */}

        <View style={tw`flex flex-row gap-x-3`}>
          <Pressable
            onPress={() => navigation.navigate("Flashcards")}
            style={tw` p-2 border border-2 rounded-full`}
          >
            <Entypo name="documents" size={24} color="black" />
          </Pressable>

          {/* <Pressable
              onPress={() => navigation.navigate("Flashcards")}
              style={tw` p-2 border border-2 rounded-full`}
            >
              <AntDesign name="question" size={24} color="black" />
            </Pressable> */}
          <Pressable
            onPress={() => navigation.navigate("Quiz")}
            style={tw` p-2 border border-2 rounded-full`}
          >
            <MaterialCommunityIcons name="brain" size={24} color="black" />
          </Pressable>
        </View>

        <View>
          {!summary || summary.length === 0 ? (
            <Text> Upload Notes On Home Page To Get Started.</Text>
          ) : (
            <Markdown>{summary}</Markdown>
          )}
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

export default SummaryScreen;
