import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const AddedNotesScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.68.103:4001/user-notes")
      .then(({ data }) => {
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error fetching user notes:", error);
      });
  }, []);

  return (
    <View style={tw`flex-1 mt-12 `}>
      {/* Top view */}
      <View
        style={tw`flex flex-row items-center justify-between border-b border-gray-200 py-5 px-5`}
      >
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-center`}
          onPress={() => navigation.navigate("Home")}
        >
          <Entypo name="chevron-left" size={28} color="black" />
          <Text style={tw`font-semibold text-lg`}>Library</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 px-5 bg-gray-100`}>
        <View style={tw`flex flex-col mt-4 justify-center gap-y-8`}>
          <View style={tw`flex flex-row gap-x-2 items-center`}>
            <Text style={tw`text-2xl text-black text-left font-semibold`}>
              Computer Science
            </Text>
          </View>

          <ScrollView style={tw`flex flex-col gap-y-2 `}>
            {notes.map((note, index) => (
              <View
                key={index}
                style={tw`my-2 py-3 flex flex-row items-center bg-white rounded-lg w-full`}
              >
                <View style={tw`ml-2`}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("NotesDocumentView", {
                        uri: note.filePath,
                      })
                    }
                  >
                    <Image
                      source={require("../../assets/imgPlaceholder.png")}
                      style={tw`w-[75px] h-[75px]`}
                    />
                  </TouchableOpacity>
                </View>

                <View style={tw`flex flex-col w-9/10 px-5 `}>
                  <Text style={tw`text-md font-semibold mb-2 w-3/4 `}>
                    {note.title}
                  </Text>
                  <View style={tw`w-4/5 border-b border-gray-300 mb-2`}></View>

                  <View style={tw`flex flex-row justify-between`}>
                    <View style={tw`flex flex-col`}>
                      <Text style={tw`text-sm font-light text-gray-500`}>
                        {new Date(note.uploadedAt).toLocaleDateString()}{" "}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={tw`left-30 mt-4 flex flex-row items-center gap-x-2`}
                  >
                    <TouchableOpacity>
                      <Entypo
                        name="share-alternative"
                        size={24}
                        color="black"
                      />
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
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AddedNotesScreen;
