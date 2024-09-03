import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Modal } from "./Modal";

const CustomModal = ({
  isModalOpen,
  setIsModalOpen,
  docPicker,
  subjectTitle,
  setsTitle,
  onSubjectTitleChange,
  onSetsTitleChange,
}) => {
  const [isSetsTitleValid, setIsSetsTitleValid] = useState(false);
  const [isSubjectTitleValid, setIsSubjectTitleValid] = useState(false);

  const handleSetsTitleChange = (text) => {
    onSetsTitleChange(text);
    setIsSetsTitleValid(text.length >= 3);
  };

  const handleSubjectTitleChange = (text) => {
    onSubjectTitleChange(text);
    setIsSubjectTitleValid(text.length >= 3);
  };

  return (
    <Modal isOpen={isModalOpen} withInput>
      <View style={tw`bg-white w-full p-4 rounded-xl flex-col gap-y-6`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-lg font-semibold`}>Create New Note Set</Text>
          <TouchableOpacity onPress={() => setIsModalOpen(false)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-col gap-y-4`}>
          <View style={tw`flex flex-col gap-y-1`}>
            {isSetsTitleValid ? (
              <Text style={tw`text-md font-semibold text-gray-500`}>
                Title of Set
              </Text>
            ) : (
              <Text style={tw`text-md font-semibold text-red-500`}>
                Atleast 3 Characters
              </Text>
            )}
            <TextInput
              placeholder="Title Of Set. i.e Maths"
              value={setsTitle}
              onChangeText={handleSetsTitleChange}
              mode="outlined"
            />
          </View>
          <View style={tw`flex flex-col gap-y-1`}>
            {isSubjectTitleValid ? (
              <Text style={tw`text-md font-semibold text-gray-500`}>
                Title of Set
              </Text>
            ) : (
              <Text style={tw`text-md font-semibold text-red-500`}>
                Atleast 3 Characters
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
            * Title of your notes will be automaticall generated
          </Text>
          <TouchableOpacity
            style={[
              tw`rounded-2xl items-center gap-3 justify-center flex flex-row p-5`,
              isSetsTitleValid && isSubjectTitleValid
                ? tw`bg-black`
                : tw`bg-gray-400`,
            ]}
            onPress={docPicker}
            disabled={!isSetsTitleValid || !isSubjectTitleValid}
          >
            <Text style={tw`text-white`}>Select document to finish</Text>
            <Ionicons name="cloud-upload-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeComponentMainModal = ({
  docPicker,
  subjectTitle,
  setsTitle,
  onSubjectTitleChange,
  onSetsTitleChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalOpen(true)}
        style={tw`absolute bottom-5 left-75 p-3 bg-black rounded-full`}
      >
        <Entypo name="plus" size={30} color="white" />
      </TouchableOpacity>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        docPicker={docPicker}
        subjectTitle={subjectTitle}
        setsTitle={setsTitle}
        onSubjectTitleChange={onSubjectTitleChange}
        onSetsTitleChange={onSetsTitleChange}
      />
    </>
  );
};

export default HomeComponentMainModal;
