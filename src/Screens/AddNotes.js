import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Pressable, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import tw from "twrnc";

//parse

const AddNotes = () => {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <View style={tw`flex flex-col px-5`}>
        <Text style={tw`text-2xl font-semibold`}>
          Choose the file format of your notes
        </Text>
        <Pressable
          style={tw`border-2  mt-10 pl-4 pr-5 py-1 rounded-xl flex  flex-col items-center`}
        >
          <AntDesign name="pdffile1" size={24} color="black" />
          <Text style={tw`text-black text-lg`}>Upload</Text>
        </Pressable>
      </View>
      <Pressable
        style={tw`bg-green-500 mt-10 pl-4 pr-5 py-1 rounded-xl flex flex-row justify-between `}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Generate Quiz</Text>
      </Pressable>
    </View>
  );
};

export default AddNotes;
