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
import { FontAwesome5 } from "@expo/vector-icons";
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
    <ScrollView>
      <View style={tw`flex-1 flex-col p-5 gap-y-8`}>
        <Text
          style={tw` font-medium text-4xl text-center justify-between items-center mt-20`}
        >
          We'll take notes so you don't have to.
        </Text>

        <Text style={tw`text-gray-500 text-md text-center font-light `}>
          View your summarised notes and flashcards below. Study smarter today.
        </Text>

        <View
          style={tw`flex flex-row gap-x-6 items-center justify-center mt-10  `}
        >
          <Pressable
            onPress={() => navigation.navigate("Summary")}
            style={tw`gap-y-2 flex text-center justify-center items-center border border-gray-200 py-5 px-5 rounded-xl`}
          >
            <View style={tw`p-2`}>
              <MaterialIcons name="notes" size={24} color="black" />
            </View>
            <Text style={tw`text-left font-semibold text-md`}>Summary</Text>

            {/* <Text style={tw`text-center font-light text-xs`}>
            
          </Text> */}
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Flashcards")}
            style={tw`gap-y-2 flex text-center justify-center items-center border border-gray-200 py-5 px-5 rounded-xl`}
          >
            <View style={tw`p-2`}>
              <Entypo name="documents" size={24} color="black" />
            </View>
            <Text style={tw`text-left font-semibold text-md`}>Flashcards</Text>

            {/* <Text style={tw`text-center font-light text-xs`}>
            
          </Text> */}
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
