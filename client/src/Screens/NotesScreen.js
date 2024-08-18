import React, { useContext } from "react";
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";

const NotesScreen = ({ navigation }) => {
  // Data for FlatList
  const data = [
    {
      id: "1",
      name: "Summary",
      description: "Get beautiful summaries of your notes",
      icon: "notes",
      iconType: "MaterialIcons",
      screen: "Summary",
    },
    {
      id: "2",
      name: "Flashcards",
      description: "Review your flashcards",
      icon: "newspaper-variant-multiple-outline",
      iconType: "MaterialCommunityIcons",
      screen: "Flashcards",
    },
    {
      id: "3",
      name: "Quiz",
      description: "Test your knowledge with quizzes",
      icon: "brain",
      iconType: "MaterialCommunityIcons",
      screen: "Quiz",
    },
    {
      id: "4",
      name: "Co-Pilot",
      description: "AI-powered assistant to help you",
      icon: "robot-outline",
      iconType: "MaterialCommunityIcons",
      screen: "CoPilot",
    },
  ];

  //Touchable item to render
  const renderItem = ({ item }) => {
    const IconComponent =
      item.iconType === "MaterialIcons"
        ? MaterialIcons
        : MaterialCommunityIcons;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.screen)}
        style={tw`mx-2 my-2 w-9/20 p-9 bg-white gap-y-2 flex text-center justify-center items-center border border-gray-300 rounded-xl`}
      >
        <IconComponent name={item.icon} size={24} color="black" />
        <Text style={tw`text-center font-semibold text-md`}>{item.name}</Text>
        <Text style={tw`text-center font-medium text-xs text-gray-500`}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };
  //--------------------------------------------------------------------------------------

  return (
    <ScrollView style={tw`bg-gray-100`}>
      <View style={tw`flex-1 flex-col px-5 gap-y-8 mt-25`}>
        <Text style={tw`font-medium text-4xl text-center`}>
          We'll take notes so you don't have to.
        </Text>

        <Text style={tw`text-gray-500 text-md text-center font-light`}>
          View your summarised notes and flashcards below. Study smarter today.
        </Text>

        {/* FlatList Approach, a lot cleaner */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};

export default NotesScreen;
