import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import React from "react";

const predefined = [
  { title: "Heading", text: "Message content" },
  { title: "Heading", text: "Message content" },
  { title: "Heading", text: "Message content" },
];

const CoPilotSugesstions = ({ onSelectedCard }) => {
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tw`gap-x-4 flex flex-row`}>
          {predefined.map((message, index) => (
            <TouchableOpacity
              style={tw`p-2 bg-gray-200 rounded-xl `}
              key={index}
              onPress={() =>
                onSelectedCard(`${message.title}, ${message.text}`)
              }
            >
              <Text style={tw`font-semibold text-md`}>{message.title}</Text>
              <Text style={tw` font-light text-sm text-gray-500`}>
                {message.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default CoPilotSugesstions;

const styles = StyleSheet.create({});
