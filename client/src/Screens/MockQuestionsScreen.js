import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MockQuestionsScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={tw`flex flex-row items-center justify-start  mt-1 `}>
        <TouchableOpacity
          style={tw`flex flex-row items-center  justify-center p-2 `}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={tw`font-semibold text-lg text-center`}>
          {" "}
          Mock Questions
        </Text>
      </View>
      <KeyboardAwareScrollView extraHeight={140}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={tw`flex-1 p-5 `}>
            <View style={tw`flex flex-col gap-y-5 mb-5`}>
              <Text style={tw`font-semibold text-lg`}>
                Complier make use of various parsing techniques list 4
              </Text>
              <TextInput
                placeholderTextColor="#909090"
                style={{ ...styles.input, height: 60 }}
                placeholder="Enter Your Answer"
                blurOnSubmit={false}
                scrollEnabled={true}
                onChange={({ nativeEvent }) => setMessage(nativeEvent.text)}
                multiline={true}
                value={message}
                onContentSizeChange={({ nativeEvent }) => {
                  //   console.log(nativeEvent.contentSize.height);
                }}
              />
              <Text style={tw`font-semibold text-lg`}>
                Complier make use of various parsing techniques list 4
              </Text>
              <TextInput
                placeholderTextColor="#909090"
                style={{ ...styles.input, height: 60 }}
                placeholder="Enter Your Answer"
                blurOnSubmit={false}
                scrollEnabled={true}
                onChange={({ nativeEvent }) => setMessage(nativeEvent.text)}
                multiline={true}
                value={message}
                onContentSizeChange={({ nativeEvent }) => {
                  //   console.log(nativeEvent.contentSize.height);
                }}
              />
              <Text style={tw`font-semibold text-lg`}>
                Complier make use of various parsing techniques list 4
              </Text>
              <TextInput
                placeholderTextColor="#909090"
                style={{ ...styles.input, height: 60 }}
                placeholder="Enter Your Answer"
                blurOnSubmit={false}
                scrollEnabled={true}
                onChange={({ nativeEvent }) => setMessage(nativeEvent.text)}
                multiline={true}
                value={message}
                onContentSizeChange={({ nativeEvent }) => {
                  //   console.log(nativeEvent.contentSize.height);
                }}
              />
              <Text style={tw`font-semibold text-lg`}>
                Complier make use of various parsing techniques list 4
              </Text>
              <TextInput
                placeholderTextColor="#909090"
                style={{ ...styles.input, height: 60 }}
                placeholder="Enter Your Answer"
                blurOnSubmit={false}
                scrollEnabled={true}
                onChange={({ nativeEvent }) => setMessage(nativeEvent.text)}
                multiline={true}
                value={message}
                onContentSizeChange={({ nativeEvent }) => {
                  //   console.log(nativeEvent.contentSize.height);
                }}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F5F5F5",
    height: "100%",
    fontFamily: "Semibold",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    maxHeight: 100,
    fontSize: 20,
    flex: 1,
    alignItems: "flex-start",
  },
});

export default MockQuestionsScreen;
