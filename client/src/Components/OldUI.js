import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OldUI = () => {
  return (
    <>
      {/* -----------------------------------------------------------OLD UI-------------------------------------------------------------------------------*/}
      {/*Headline */}
      {/* <Text
                style={tw` mt-10 font-medium text-3xl text-center justify-between items-center`}
              >
                Summarise With Ease
      
              </Text> */}

      {/*Document icons */}
      {/* <View style={tw`flex flex-col gap-y-2 items-center mt-4 mb-1`}>
                <View
                  style={tw`flex flex-row gap-x-4 items-center justify-center`}
                >
                  <Image
                    source={require("../../assets/pdfIcon.png")}
                    style={tw.style(tw``)}
                  />
                  <Image
                    source={require("../../assets/docIcon.png")}
                    style={tw.style(tw``)}
                  />
                </View>

                <Image
                  source={require("../../assets/underlineIcon.png")}
                  style={tw.style(tw``)}
                />
              </View>

              
              <Text
                style={tw`text-gray-500 text-md text-center font-light mt-2 `}
              >
                Effortlessly transform heavy course material into focused
                summaries, flashcards and interactive quizzes.
              </Text> */}

      {/*DOCUMENT PICKER */}

      {/* <View style={tw`text-left my-5`}>
                <Text style={tw`text-xl font-semibold`}>
                  Here's how to get started
                </Text>
              </View>
              <TouchableOpacity
                onPress={pickDocument}
                style={tw` bg-blue-500 text-white gap-y-2 flex text-center justify-center items-center py-3 px-5 rounded-xl`}
              >
                <View style={tw`p-2`}>
                  <AntDesign name="addfile" size={24} color="white" />
                </View>
                <Text style={tw`text-left font-semibold text-md text-white`}>
                  Upload Material
                </Text>

                <Text style={tw`text-center font-light text-xs text-white`}>
                  Compatible with all your study material. Choose .pdf, .docx,
                  .pptx
                </Text>
           
              </TouchableOpacity> */}
      {/* -----------------------------------------------------------OLD UI-------------------------------------------------------------------------------*/}

      {/* -----------------------------------------------------------OLD UI-------------------------------------------------------------------------------*/}
      {/* <Pressable
                onPress={pickDocument}
                style={tw` bg-white  gap-x-5 flex flex-row  items-center border-2 border-gray-300 p-5 w-full rounded-xl`}
              >
                <Ionicons name="documents-outline" size={34} color="black" />

                <Text style={tw` text-lgtext-left font-semibold text-md`}>
                  Upload Your Study Material
                </Text>
              </Pressable> */}

      {/* <Text style={tw`text-xl font-semibold`}>Get started</Text>
              <View
                style={tw` mt-5 bg-white p-5 gap-y-5 items-center justify-center rounded-xl`}
              >
                <FontAwesome5 name="file-pdf" size={36} color="black" />

                <TouchableOpacity
                  onPress={pickDocument}
                  style={tw`bg-blue-500 p-3 flex flex-row justify-center items-center gap-x-2 rounded-xl`}
                >
                  <AntDesign name="upload" size={24} color="white" />

                  <Text style={tw`text-white `}>Upload Notes</Text>
                </TouchableOpacity>

                <Text style={tw`text-black `}>
                  Compatible with pdf, .docx, .pptx
                </Text>
              </View> */}
      {/* -----------------------------------------------------------OLD UI-------------------------------------------------------------------------------*/}
    </>
  );
};

export default OldUI;

const styles = StyleSheet.create({});
