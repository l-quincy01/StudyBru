import React, { useContext } from "react";
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";

const NotesScreen = ({ navigation }) => {
  const { flashCards } = useContext(FlashCardsContext);

  // Data for FlatList
  const data = [
    {
      id: "1",
      name: "Summary",
      description: "Get beautiful summaries of your notes",
      icon: "notes",
      screen: "Summary",
    },
    {
      id: "2",
      name: "Flashcards",
      description: "Review your flashcards",
      icon: "newspaper-variant-multiple-outline",
      screen: "Flashcards",
    },
    {
      id: "3",
      name: "Quiz",
      description: "Test your knowledge with quizzes",
      icon: "brain",
      screen: "Quiz",
    },
    {
      id: "4",
      name: "Co-Pilot",
      description: "AI-powered assistant to help you",
      icon: "robot-outline",
      screen: "Summary",
    },
  ];

  // Render each item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.screen)}
      style={tw`w-1/2 p-10 bg-white gap-y-2 flex text-center justify-center items-center border border-gray-300 rounded-xl`}
    >
      <MaterialIcons name={item.icon} size={24} color="black" />
      <Text style={tw`text-center font-semibold text-md`}>{item.name}</Text>
      <Text style={tw`text-center font-medium text-xs text-gray-500`}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={tw`bg-gray-100`}>
      <View style={tw`flex-1 flex-col px-5 gap-y-8 mt-25`}>
        <Text style={tw`font-medium text-4xl text-center`}>
          We'll take notes so you don't have to.
        </Text>

        <Text style={tw`text-gray-500 text-md text-center font-light`}>
          View your summarised notes and flashcards below. Study smarter today.
        </Text>

        {/* FlatList to render items in 2 columns */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={tw``} // Ensures columns are spaced
          contentContainerStyle={tw`gap-4`} // Adds vertical gap
          ItemSeparatorComponent={() => (
            <View style={tw`mx-4`}>
              <Text style={tw`mx-4`}> </Text>
            </View>
          )} // Adds horizontal gap
        />
      </View>
    </ScrollView>
  );
};

export default NotesScreen;
