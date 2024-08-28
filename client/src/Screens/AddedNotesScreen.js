import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import tw from "twrnc";
import {
  Entypo,
  Fontisto,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import axios from "axios";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => ["30%"], []);
  const bottomSheetRef = useRef(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
    setIsOpen(true);
  };

  const handleSheetClose = () => {
    setIsOpen(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={tw`flex-1 mt-12`}>
        <TouchableWithoutFeedback onPress={handleClosePress}>
          <View style={tw.style("flex-1", isOpen && "bg-gray-100 opacity-20")}>
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

                <ScrollView style={tw`flex flex-col gap-y-2`}>
                  {notes.map((note, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("NotesDocumentView", {
                          uri: note.filePath,
                        })
                      }
                      key={index}
                      style={tw`my-2 py-3 flex flex-row items-start bg-white rounded-lg w-full`}
                    >
                      <View style={tw`ml-2`}>
                        <Image
                          source={require("../../assets/imgPlaceholder.png")}
                          style={tw`w-[75px] h-[75px]`}
                        />
                      </View>

                      <View style={tw`flex flex-col w-9/10 px-5`}>
                        <Text style={tw`text-md font-semibold mb-2 w-3/4`}>
                          {note.title}
                        </Text>
                        <View
                          style={tw`w-4/5 border-b border-gray-300 mb-2`}
                        ></View>

                        <View style={tw`flex flex-row justify-between`}>
                          <View style={tw`flex flex-col`}>
                            <Text style={tw`text-sm font-light text-gray-500`}>
                              {new Date(note.uploadedAt).toLocaleDateString()}{" "}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={tw`left-45 flex flex-row items-center gap-x-2`}
                        >
                          <TouchableOpacity>
                            <SimpleLineIcons
                              onPress={handleOpenPress}
                              name="options"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {isOpen && (
          <TouchableWithoutFeedback onPress={handleClosePress}>
            <View
              style={tw`absolute top-0 left-0 right-0 bottom-0 bg-transparent z-10`}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        index={-1}
        onClose={handleSheetClose}
        style={tw`flex flex-col `}
        // backgroundStyle={tw`bg-gray-100`}
      >
        <View style={tw`flex flex-col gap-y-4 px-5`}>
          <TouchableOpacity style={tw`flex flex-row gap-x-4 items-center`}>
            <Ionicons name="checkbox-outline" size={24} color="black" />
            <Text style={tw`font-normal text-gray-500 text-sm`}>
              Set as active
            </Text>
          </TouchableOpacity>
          <View style={tw`border-b border-gray-300 w-full mb-1`}></View>
          <TouchableOpacity style={tw`flex flex-row gap-x-4 items-center`}>
            <Entypo name="share-alternative" size={24} color="black" />
            <Text style={tw`font-normal text-gray-500 text-sm`}>Share</Text>
          </TouchableOpacity>
          <View style={tw`border-b border-gray-300 w-full mb-1`}></View>
          <TouchableOpacity style={tw`flex flex-row gap-x-4 items-center`}>
            <MaterialIcons name="open-in-new" size={24} color="black" />
            <Text style={tw`font-normal text-gray-500 text-sm`}>Open</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default AddedNotesScreen;
