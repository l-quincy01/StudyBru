import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

import tw from "twrnc";

import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const AddedNotesScreen = ({ navigation }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const colourCodes = [
    "blue",
    "red",
    "green",
    "yellow",
    "pink",
    "orange",
    "purple",
  ];

  return (
    <View style={tw`flex-1 mt-12 `}>
      {/*Top view */}
      <View
        style={tw`flex flex-row items-center justify-between border-b border-gray-200  py-5 px-5`}
      >
        {/* <Text style={tw`text-3xl text-left font-bold`}> 'StudyBuddy' </Text> */}

        <TouchableOpacity
          style={tw`flex flex-row items-center  justify-center`}
          onPress={() => navigation.navigate("Home")}
        >
          <Entypo name="chevron-left" size={28} color="black" />

          <Text style={tw`font-semibold text-lg`}> Library</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 px-5 bg-gray-100`}>
        <View style={tw`flex flex-col mt-4 justify-center gap-y-8`}>
          <View style={tw` flex flex-row gap-x-2 items-center`}>
            <Text style={tw` text-2xl text-black text-left font-semibold`}>
              Computer Science
            </Text>
          </View>

          <ScrollView style={tw`flex flex-col gap-y-2 `}>
            {/* Notes Card */}
            <View
              // onPress={() => nav.navigate("AddedNotes")}
              style={tw`my-2  py-3 flex flex-row  items-center bg-white rounded-lg w-full`}
            >
              {/* COLOUR CODE */}
              <View style={tw`ml-2`}>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/imgPlaceholder.png")}
                    style={tw`w-[75px] h-[75px]`}
                  />
                </TouchableOpacity>
              </View>

              {/* <AntDesign name="pptfile1" size={32} color="black" /> */}
              <View style={tw`flex flex-col w-9/10 px-5 `}>
                <Text style={tw`text-lg font-semibold mb-2 `}>
                  Lecture 5 PLT
                </Text>
                <View style={tw` w-4/5 border-b border-gray-300 mb-2`}></View>

                <View style={tw` flex flex-row justify-between`}>
                  <View style={tw`flex flex-col`}>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Date created {formattedDate}
                    </Text>
                  </View>
                </View>

                <View
                  style={tw`left-30 mt-4 flex flex-row items-center gap-x-2`}
                >
                  <TouchableOpacity>
                    <Entypo name="share-alternative" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="cloud-download-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="delete-forever-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AddedNotesScreen;
