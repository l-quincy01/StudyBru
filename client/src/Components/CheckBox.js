import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckBox = ({ notesArr, checkedValues, onChange, style }) => {
  let updatedCheckedValues = [...checkedValues];

  return (
    <View style={tw``}>
      {options.map((option) => {
        return (
          <TouchableOpacity
            style={tw``}
            onPress={() => {
              updatedCheckedValues.push(option.value);
              onChange(updatedCheckedValues);
            }}
          >
            {/* <View style={tw` px-2 gap-y-2 flex flex-col  `}>
                <View style={tw`flex flex-row items-center justify-between`}>
                  <Text style={tw`text-lg font-semibold `}>
                    Heading of Notes
                  </Text>

                  <AntDesign name="checkcircle" size={24} color="black" />
                </View>
                <Text style={tw`text-xs font-light`}>
                  Effortlessly transform heavy course material into focused
                  summaries, flashcards and interactive quizzes.
                </Text>

                <View style={tw`flex flex-row justify-between items-center`}>
                  <Text style={tw`text-xs font-light`}>
                    Date Created: {formattedDate}
                  </Text>
                  <Entypo name="documents" size={24} color="black" />
                </View>
              </View> */}
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              size={24}
              color="black"
            />

            <Text style={tw``}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CheckBox;
