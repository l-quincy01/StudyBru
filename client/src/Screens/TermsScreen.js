import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
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

const TermsScreen = () => {
  return (
    <View style={tw`flex flex-col gap-y-4`}>
      <View style={tw` rounded-2xl bg-blue-50 p-4 flex flex-col gap-y-2`}>
        <Text style={tw`font-semibold text-xl`}>Term</Text>
        <Text style={tw`font-semibold text-md font-light text-gray-500`}>
          Writing objects: 100% (20/20), 11.78 KiB | 3.93 MiB/s, done. Total 20
          (delta 14), reused 0 (delta 0), pack-reused 0 remote: Resolving
          deltas: 100% (14/14), completed with 12 local objects. remote: This
          repository moved. Please use the new location:
        </Text>
      </View>
    </View>
  );
};

export default TermsScreen;
