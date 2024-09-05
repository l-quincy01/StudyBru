import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
} from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { addChat, addMessage, getMessages } from "../config/Database";
import { Role } from "../config/interfaces";
// import { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID } from "@env";
import OpenAI from "react-native-openai";
import { useSQLiteContext } from "expo-sqlite";
const CoPilotScreen = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [height, setHeight] = useState(0);
  const [chatId, _setChatId] = useState(null);
  const chatIdRef = useRef(chatId);
  const db = useSQLiteContext();

  //   function setChatId(id) {
  //     chatIdRef.current = id;
  //     _setChatId(id);
  //   }
  //   useEffect(() => {
  //     if (chatId) {
  //       getMessages(db, parseInt(chatId)).then((res) => {
  //         setMessages(res);
  //       });
  //     }
  //   }, [chatId]);
  //   const openAI = useMemo(
  //     () =>
  //       new OpenAI({
  //         apiKey: key,
  //         organization: "",
  //       }),
  //     []
  //   );
  //   useEffect(() => {
  //     const handleNewMessage = (payload) => {
  //       setMessages((messages) => {
  //         const newMessage = payload.choices[0]?.delta.content;
  //         if (newMessage) {
  //           messages[messages.length - 1].content += newMessage;
  //           return [...messages];
  //         }
  //         if (payload.choices[0]?.finishReason) {
  //           addMessage(db, parseInt(chatIdRef.current), {
  //             content: messages[messages.length - 1].content,
  //             role: Role.Bot,
  //           });
  //         }
  //         return messages;
  //       });
  //     };
  //     openAI.chat.addListener("onChatMessageReceived", handleNewMessage);
  //     return () => {
  //       openAI.chat.removeListener("onChatMessageReceived");
  //     };
  //   }, [openAI]);

  //  const getCompletion = async (text) => {
  //     if (messages.length === 0) {
  //       addChat(db, text).then((res) => {
  //         const chatID = res.lastInsertRowId;
  //         setChatId(chatID.toString());
  //         addMessage(db, chatID, { content: text, role: Role.User });
  //       });
  //     }
  //     setMessages([
  //       ...messages,
  //       { role: Role.User, content: text },
  //       { role: Role.Bot, content: "" },
  //     ]);
  //     openAI.chat.stream({
  //       messages: [
  //         {
  //           role: "user",
  //           content: text,
  //         },
  //       ],
  //       model: "gpt-3.5-turbo",
  //     });
  //   };
  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView style={tw`bg-gray-100`}>
        <View style={tw`p-4`}>
          {/* {messages.map((msg, index) => (
            <View key={index} style={tw`mb-2`}>
              <Text style={tw`text-base`}>
                {msg.role === Role.User ? "You: " : "Bot: "}
                {msg.content}
              </Text>
            </View>
          ))} */}
          <Text style={tw`text-base`}>Work in Progress</Text>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={tw`px-4 gap-y-4 bottom-0`}>
          {/* {messages.length === 0 && (
            <CoPilotSugesstions onSelectedCard={getCompletion} />
          )} */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={tw`flex flex-row bottom-0 items-center gap-x-3 mb-5`}>
              <View style={tw`border border-gray-300 rounded-3xl w-4/5`}>
                <TextInput
                  style={tw`flex-grow p-3`}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type your message"
                />
              </View>
              <TouchableOpacity
                style={tw`items-center justify-center flex rounded-full bg-black p-2`}
                // onPress={() => getCompletion(input)}
              >
                <Feather name="send" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CoPilotScreen;
