import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import {
  AntDesign,
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
              placeholder="Title describing your created set."
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
              placeholder="Title describing your subject"
              value={subjectTitle}
              onChangeText={handleSubjectTitleChange}
              mode="outlined"
            />
          </View>
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

const GetStartedComponent = ({
  docPicker,
  subjectTitle,
  setsTitle,
  onSubjectTitleChange,
  onSetsTitleChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <View style={tw`flex flex-col`}>
        <Text style={tw`mt-4 text-3xl text-left font-extrabold`}>
          Get started
        </Text>
      </View>

      <View style={tw`flex flex-col my-5 gap-y-7`}>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons
            name="file-document-edit"
            size={40}
            color="black"
          />
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-xl font-semibold`}>Summaries</Text>
            <Text style={tw`text-md font-light text-gray-500 w-1/2`}>
              Get beautiful summaries
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons
            name="file-document-multiple"
            size={40}
            color="black"
          />
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-xl font-semibold`}>Flashcards</Text>
            <Text style={tw`text-md font-light text-gray-500 w-2/3`}>
              Create neat and clever flashcards to assist with studying.
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons name="brain" size={40} color="black" />
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-xl font-semibold`}>Quiz</Text>
            <Text style={tw`text-md font-light text-gray-500 w-2/3`}>
              Create interactive quizzes based on your notes.
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialCommunityIcons name="robot" size={40} color="black" />
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-xl font-semibold`}>Co Pilot</Text>
            <Text style={tw`text-md font-light text-gray-500 w-2/3`}>
              Get AI explanations on concepts you find difficult.
            </Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-5`}>
          <MaterialIcons name="quiz" size={40} color="black" />
          <View style={tw`flex flex-col`}>
            <Text style={tw`text-xl font-semibold`}>Mock Test</Text>
            <Text style={tw`text-md font-light text-gray-500 w-2/3`}>
              Create mock test questions to further improve your studying.
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setIsModalOpen(true)}
        style={tw`rounded-2xl bg-black items-center gap-3 justify-center flex flex-row p-5`}
      >
        <Text style={tw`text-md font-semibold text-white`}>Add Notes Set</Text>
        <Ionicons name="add" size={24} color="white" />
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

export default GetStartedComponent;
