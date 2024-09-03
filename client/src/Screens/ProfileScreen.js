import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`flex-1 px-5 bg-gray-100`}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
        <Entypo name="chevron-left" size={28} color="black" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={tw`flex flex-col gap-y-8 justify-center`}
      >
        <TouchableOpacity style={tw`flex-row gap-x-6  items-center p-4`}>
          <AntDesign name="user" size={28} color="black" />
          <View style={tw`flex-col`}>
            <Text style={tw`text-lg`}>Details</Text>
            <Text style={tw`text-gray-500`}>Name, email</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-x-6  items-center p-4`}>
          <MaterialIcons name="feedback" size={24} color="black" />
          <View style={tw`flex-col`}>
            <Text style={tw`text-lg`}>Feedback</Text>
            <Text style={tw`text-gray-500`}>
              Report a bug oor give suggestions
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-x-6  items-center p-4`}>
          <Feather name="star" size={28} color="black" />
          <View style={tw`flex-col`}>
            <Text style={tw`text-lg`}>Rate StudyBuddy</Text>
            <Text style={tw`text-gray-500`}>Leave a rating</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-x-6  items-center p-4`}>
          <MaterialIcons name="logout" size={28} color="black" />
          <View style={tw`flex-col`}>
            <Text style={tw`text-lg`}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
