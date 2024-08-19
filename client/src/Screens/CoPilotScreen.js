import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

const CoPilotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const aiResponse = await chatWithAi(input);
    const aiMessage = { role: "assistant", content: aiResponse };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView style={tw`bg-gray-100`}>
        <View>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              item.role === "user" ? (
                <View
                  style={tw` left-50  p-5 m-3 rounded-3xl bg-gray-500 w-1/3`}
                >
                  <Text style={tw` text-white `}>{item.content} </Text>
                </View>
              ) : (
                <View style={tw` p-5 m-3 rounded-3xl bg-gray-500 w-1/3`}>
                  <Text style={tw` text-white `}>{item.content} </Text>
                </View>
              )
            }
          />
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={150}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tw` px-5`}>
            <View
              style={tw` border border-gray-300 rounded-3xl  flex flex-row justify-center items-center mb-5`}
            >
              <TextInput
                style={tw` flex-grow p-5`}
                value={input}
                onChangeText={setInput}
                placeholder="Type your message"
              />
              <TouchableOpacity style={tw`  mr-4`} onPress={sendMessage}>
                <Feather name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },

  textInput: {
    borderColor: "#000000",
    borderBottomWidth: 1,
  },
});

export default CoPilotScreen;
