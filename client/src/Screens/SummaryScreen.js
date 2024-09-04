import React, { useState, useRef, useContext } from "react";
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  const copy = `\`${summary}\``;

  return (
    <View style={tw`flex  flex-col gap-y-8 `}>
      {/* Summary Heading */}
      {/* <Text style={tw`text-xl font-semibold`}> Notes Summary</Text>

          {/* Buttons }

          <View style={tw`flex flex-row gap-x-3`}>
            <Pressable
              onPress={() => navigation.navigate("Flashcards")}
              style={tw` p-2 border border-2 rounded-full`}
            >
              <Entypo name="documents" size={16} color="black" />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Quiz")}
              style={tw` p-2 border border-2 rounded-full`}
            >
              <MaterialCommunityIcons name="brain" size={16} color="black" />
            </Pressable>
          </View> */}

      <View>
        {!summary || summary.length === 0 ? (
          <>
            <View
              style={tw` mt-30  flex flex-col gap-5 items-center justify-center`}
            >
              <Image
                source={require("../../assets/NoNotes.png")}
                style={tw`w-[120px] h-[120px]`}
              />
              <Text style={tw`mt-4 text-2xl text-center font-bold`}>
                Oops Notes Not Found! Get Started On The Homepage!
              </Text>
            </View>
          </>
        ) : (
          <Markdown>{summary}</Markdown>
        )}
      </View>
    </View>
  );
};

export default SummaryScreen;
