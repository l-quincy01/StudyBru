import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import tw from "twrnc";
import axios from "axios";
import { QuizContext } from "../config/QuizContext";
import { FlashCardsContext } from "../config/FlashCardsContext";
import { SummaryContext } from "../config/SummaryContext";
import GetStartedComponent from "../Components/GetStartedComponent";
import HomeComponent from "../Components/HomeComponent";
import {
  AntDesign,
  Entypo,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Modal } from "../Components/Modal";
import { TextInput } from "react-native-paper";
import HomeComponentMainModal from "../Components/HomeComponentMainModal";
import { MockQuestionsContext } from "../config/MockQuestionsContext";
import { TermsContext } from "../config/TermsContext";

const TermsScreen = () => {
  const { terms } = useContext(TermsContext);

  if (!terms || terms.length === 0) {
    return (
      <>
        <View style={tw`mt-30 flex flex-col gap-5 items-center justify-center`}>
          <Image
            source={require("../../assets/NoNotes.png")}
            style={tw`w-[120px] h-[120px]`}
          />
          <Text style={tw`mt-4 text-2xl text-center font-bold`}>
            Oops Notes Not Found! Get Started On The Homepage!
          </Text>
        </View>
      </>
    );
  }

  return (
    <View style={tw`flex flex-col gap-y-4 mb-5`}>
      {terms.map((item, index) => (
        <View
          key={index}
          style={tw` rounded-2xl bg-gray-100 p-4 flex flex-col gap-y-2`}
        >
          <Text style={tw`font-semibold text-xl`}>{item.term}</Text>
          <Text style={tw`font-semibold text-md font-light text-gray-500`}>
            {item.definition}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default TermsScreen;
