import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import tw from "twrnc";

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const GetStartedComponent = ({ docPicker }) => {
  return (
    <>
      <View style={tw`flex flex-col`}>
        <Text style={tw`mt-4 text-3xl text-left font-extrabold`}>
          Get started
        </Text>
      </View>

      <View style={tw`flex flex-col my-5 gap-y-7 `}>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons
            name="file-document-edit"
            size={40}
            color="black"
          />
          <View style={tw`flex flex-col `}>
            <Text style={tw`text-xl font-semibold`}>Summaries</Text>
            <Text style={tw`text-md font-light text-gray-500 w-1/2`}>
              Get beautiful summaries Get beautiful summaries Get beautiful
              summaries
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons
            name="file-document-multiple"
            size={40}
            color="black"
          />
          <View style={tw`flex flex-col `}>
            <Text style={tw`text-xl font-semibold`}>Flashcards</Text>
            <Text style={tw`text-md font-light text-gray-500 w-2/3 `}>
              Create neat and clever flashcards to assist with studying.
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons name="brain" size={40} color="black" />
          <View style={tw`flex flex-col `}>
            <Text style={tw`text-xl font-semibold`}>Quiz</Text>
            <Text style={tw`text-md font-light text-gray-500  w-2/3 `}>
              Create interactive quizzes based on your notes.
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons name="robot" size={40} color="black" />
          <View style={tw`flex flex-col `}>
            <Text style={tw`text-xl font-semibold`}>Co Pilot</Text>
            <Text style={tw`text-md font-light text-gray-500 w-2/3  `}>
              Get AI explanations on concepts you find difficult.
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialIcons name="quiz" size={40} color="black" />
          <View style={tw`flex flex-col `}>
            <Text style={tw`text-xl font-semibold`}>Mock Test</Text>
            <Text style={tw`text-md font-light text-gray-500 w-2/3 `}>
              Create mock test questions to further improve your studying
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={docPicker}
        style={tw` rounded-2xl bg-black items-center  gap-3 justify-center flex flex-row p-5`}
      >
        <Text style={tw` text-md font-semibold text-white`}>
          Upload Study Material
        </Text>
        <AntDesign name="upload" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default GetStartedComponent;

const styles = StyleSheet.create({});
