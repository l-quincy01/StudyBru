import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Modal } from "./Modals/Modal";
import { TextInput } from "react-native-paper";

const CustomModal = ({
  isModalOpen,
  setIsModalOpen,
  docPicker,
  subjectTitle,
  setsTitle, // Added this prop
  onSubjectTitleChange,
  onSetsTitleChange,
}) => {
  const [isSubjectTitleValid, setIsSubjectTitleValid] = useState(false);

  const handleSubjectTitleChange = (text) => {
    onSubjectTitleChange(text);
    setIsSubjectTitleValid(text.length >= 3);
  };

  useEffect(() => {
    onSetsTitleChange(setsTitle); // Update onSetsTitleChange when setsTitle changes
  }, [setsTitle]);

  return (
    <Modal isOpen={isModalOpen} withInput>
      <View style={tw`bg-white w-full p-4 rounded-xl flex-col gap-y-6`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-lg font-semibold`}>Create New Subject</Text>
          <TouchableOpacity onPress={() => setIsModalOpen(false)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-col gap-y-4`}>
          <Text style={tw`text-lg font-semibold`}>Set: {setsTitle}</Text>
          {/* Display setsTitle */}
          <View style={tw`flex flex-col gap-y-1`}>
            {isSubjectTitleValid ? (
              <Text style={tw`text-md font-semibold text-gray-500`}>
                Subject Title
              </Text>
            ) : (
              <Text style={tw`text-md font-semibold text-red-500`}>
                At least 3 Characters
              </Text>
            )}
            <TextInput
              placeholder="Title Of Subject. i.e Calculus"
              value={subjectTitle}
              onChangeText={handleSubjectTitleChange}
              mode="outlined"
            />
          </View>
          <Text style={tw`text-gray-500 text-md font-light `}>
            * Title of your notes will be automatically generated
          </Text>
          <TouchableOpacity
            style={[
              tw`rounded-2xl items-center gap-3 justify-center flex flex-row p-5`,
              isSubjectTitleValid ? tw`bg-black` : tw`bg-gray-400`,
            ]}
            onPress={docPicker}
            disabled={!isSubjectTitleValid}
          >
            <Text style={tw`text-white`}>Select document to finish</Text>
            <Ionicons name="cloud-upload-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeComponent = ({
  nav,
  docPicker,
  subjectTitle,
  onSubjectTitleChange,
  onSetsTitleChange,
}) => {
  const [databaseNotes, setDatabaseNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSetsTitle, setSelectedSetsTitle] = useState("");

  const colourCodes = [
    "blue",
    "red",
    "green",
    "yellow",
    "pink",
    "orange",
    "purple",
  ];

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get("http://172.20.10.7:4001/user-notes");
        setDatabaseNotes(data);
      } catch (error) {
        console.error("Error fetching user notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // Group notes by setsTitle and subjectTitle
  const groupNotes = (notes) => {
    const grouped = {};
    notes.forEach((note) => {
      const { setsTitle, subjectTitle } = note;
      if (!grouped[setsTitle]) {
        grouped[setsTitle] = {};
      }
      if (!grouped[setsTitle][subjectTitle]) {
        grouped[setsTitle][subjectTitle] = [];
      }
      grouped[setsTitle][subjectTitle].push(note);
    });
    return grouped;
  };

  const groupedNotes = groupNotes(databaseNotes);

  return (
    <>
      <View style={tw`flex flex-col mt-4 justify-center gap-y-8`}>
        <View>
          <Text style={tw` mt-4 text-xl text-left font-bold`}>Quincy</Text>
          <Text style={tw` text-md text-gray-500 text-left font-medium`}>
            Cs Major Student Rhodes University
          </Text>
        </View>
        <View style={tw`flex flex-col gap-y-6`}>
          {Object.entries(groupedNotes).map(([setsTitle, subjects], index) => (
            <View key={index}>
              <View style={tw` flex flex-row gap-x-2 items-center`}>
                <Text style={tw` text-xl text-black text-left font-semibold`}>
                  {setsTitle}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSetsTitle(setsTitle); // Set the selected setsTitle
                    setIsModalOpen(true);
                  }}
                  style={tw``}
                >
                  <AntDesign name="pluscircleo" size={17} color="blue" />
                </TouchableOpacity>
              </View>
              <ScrollView
                style={tw` gap-x-4`}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {Object.entries(subjects).map(
                  ([subjectTitle, notes], subjectIndex) => (
                    <View
                      key={subjectIndex}
                      style={tw` flex flex-col w-[250px] mr-4 `}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          nav.navigate("AddedNotes", { subjectTitle })
                        }
                        style={tw`flex flex-row items-center bg-white rounded-lg w-full my-4 `}
                      >
                        <View
                          style={tw`w-1/24 h-full bg-${colourCodes[6]}-500 rounded-l-lg`}
                        >
                          <Text> {/* Placeholder for Colour Code */} </Text>
                        </View>

                        <View style={tw`flex flex-col w-9/10 px-5 py-3`}>
                          <Text style={tw`text-lg font-semibold mb-2 `}>
                            {subjectTitle}
                          </Text>
                          <View
                            style={tw` w-full border-b border-gray-300 mb-5`}
                          ></View>
                          <View style={tw` flex flex-row justify-between`}>
                            <View style={tw`flex flex-col`}>
                              <Text
                                style={tw`text-sm font-light text-gray-500`}
                              >
                                Notes added: {notes.length}
                              </Text>
                              <Text
                                style={tw`text-sm font-light text-gray-500`}
                              >
                                Date created{" "}
                                {new Date(
                                  notes[0].uploadedAt
                                ).toLocaleDateString()}
                              </Text>
                            </View>
                            <View style={tw`left-3`}>
                              <Entypo
                                name="chevron-small-right"
                                size={34}
                                color="black"
                              />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                )}
              </ScrollView>
            </View>
          ))}
        </View>
      </View>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        docPicker={() => docPicker(selectedSetsTitle)} // Pass the selected setsTitle to docPicker
        subjectTitle={subjectTitle}
        setsTitle={selectedSetsTitle} // Pass the selected setsTitle to the modal
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    </>
  );
};

export default HomeComponent;
