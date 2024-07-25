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

//import { flashCards } from "../config/FlashCards";

const SummaryScreen = ({ navigation }) => {
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
    <SafeAreaView>
      <ScrollView>
        <View style={tw`flex-1 flex-col p-5 gap-y-8`}>
          {/* Summary Heading */}
          <Text style={tw`text-3xl font-semibold`}>
            Complier Development Process
          </Text>
          <View style={tw`border-b border border-gray-200 w-1/2`}></View>
          {/* Buttons */}
          <View style={tw`flex flex-row gap-x-3`}>
            <View style={tw` p-2 border border-2 rounded-full`}>
              <Entypo name="documents" size={24} color="black" />
            </View>

            <View style={tw` p-2 border border-2 rounded-full`}>
              <AntDesign name="question" size={24} color="black" />
            </View>
            <View style={tw` p-2 border border-2 rounded-full`}>
              <MaterialCommunityIcons name="brain" size={24} color="black" />
            </View>
          </View>
          {/* <View style={tw`border-b border border-gray-200 w-1/2`}></View> */}
          {/* <Image
            source={require("../../assets/underlineIcon.png")}
            style={tw.style(tw``)}
          /> */}

          <View>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
