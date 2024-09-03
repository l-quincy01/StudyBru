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
            <Text style={tw`mt-4 text-3xl text-left font-extrabold`}>
              Get started
            </Text>
            {/* -----------------------------------------------------------OLD UI-------------------------------------------------------------------------------*/}
            {/* <View
                  style={tw` mt-5 bg-white p-5 gap-y-5 items-center justify-center rounded-xl`}
                >
                  <FontAwesome5 name="file-pdf" size={36} color="black" />

                  <TouchableOpacity
                    // onPress={pickDocument}
                    style={tw`bg-blue-500 p-3 flex flex-row justify-center items-center gap-x-2 rounded-xl`}
                  >
                    <AntDesign name="upload" size={24} color="white" />

                    <Text style={tw`text-white `}>Upload Notes</Text>
                  </TouchableOpacity>

                  <Text style={tw`text-black `}>
                    Compatible with pdf, .docx, .pptx
                  </Text> 
                </View>*/}
            {/* -----------------------------------------------------------OLD UI-------------------------------------------------------------------------------*/}
            <View style={tw`flex flex-col items-center justify-center`}>
              <TouchableOpacity
                style={tw` rounded-2xl bg-black items-center  gap-3 justify-center flex flex-row p-5`}
              >
                <Text style={tw` text-md font-semibold text-white`}>
                  Upload Study Material
                </Text>
                <AntDesign name="upload" size={24} color="white" />
              </TouchableOpacity>
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
