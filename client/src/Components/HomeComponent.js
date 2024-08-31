import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import tw from "twrnc";

import { AntDesign, Entypo } from "@expo/vector-icons";

import { Avatar } from "react-native-paper";

const HomeComponent = ({ nav }) => {
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
    <View style={tw`flex flex-col mt-4 justify-center gap-y-8`}>
      <View>
        <Avatar.Image size={56} source={require("../../assets/avatar.png")} />
        <Text style={tw` mt-4 text-xl text-left font-bold`}>Quincy</Text>
        <Text style={tw` text-md text-gray-500 text-left font-medium`}>
          Cs Major Student Rhodes University
        </Text>
      </View>
      {/* 
              <View style={tw`flex flex-row gap-x-4 justify-center`}>
                <View
                  style={tw`flex  items-center justify-center px-4 py-2 bg-gray-300 rounded-md`}
                >
                  <Text style={tw` font-medium`}>Quincy</Text>
                </View>
              </View> */}
      <View style={tw`flex flex-col gap-y-6 `}>
        <View>
          <View style={tw` flex flex-row gap-x-2 items-center`}>
            <Text style={tw` text-xl text-black text-left font-semibold`}>
              Computer Science
            </Text>
            <TouchableOpacity style={tw``}>
              <AntDesign name="pluscircleo" size={17} color="blue" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/*Subject/course card */}
            <View style={tw`flex flex-row gap-x-3 w-full`}>
              <TouchableOpacity
                onPress={() => nav.navigate("AddedNotes")}
                style={tw`flex flex-row  items-center bg-white rounded-lg w-full`}
              >
                {/* COLOUR CODE */}
                <View
                  style={tw`w-1/24 h-full bg-${colourCodes[5]}-500 rounded-l-lg`}
                >
                  <Text> {/* NEEDED PLACE HOLDER FOR COLOUR CODE */} </Text>
                </View>

                {/* <AntDesign name="pptfile1" size={32} color="black" /> */}
                <View style={tw`flex flex-col w-9/10 px-5 py-3`}>
                  <Text style={tw`text-lg font-semibold mb-2 `}>
                    CS Complier Notes
                  </Text>
                  <View
                    style={tw` w-full border-b border-gray-300 mb-5`}
                  ></View>

                  <View style={tw` flex flex-row justify-between`}>
                    <View style={tw`flex flex-col`}>
                      <Text style={tw`text-sm font-light text-gray-500`}>
                        Notes added: {2}
                      </Text>
                      <Text style={tw`text-sm font-light text-gray-500`}>
                        Date created {formattedDate}
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
          </ScrollView>
        </View>
        <View>
          <View style={tw` flex flex-row gap-x-2 items-center`}>
            <Text style={tw` text-xl text-black text-left font-semibold`}>
              Maths
            </Text>
            <TouchableOpacity style={tw``}>
              <AntDesign name="pluscircleo" size={17} color="blue" />
            </TouchableOpacity>
          </View>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}

          {/*Subject/course card */}
          <View style={tw`flex flex-row gap-x-3 w-full`}>
            <TouchableOpacity
              onPress={() => nav.navigate("AddedNotes")}
              style={tw`flex flex-row  items-center bg-white rounded-lg w-full`}
            >
              {/* COLOUR CODE */}
              <View
                style={tw`w-1/24 h-full bg-${colourCodes[4]}-500 rounded-l-lg`}
              >
                <Text> {/* NEEDED PLACE HOLDER FOR COLOUR CODE */} </Text>
              </View>

              {/* <AntDesign name="pptfile1" size={32} color="black" /> */}
              <View style={tw`flex flex-col w-9/10 px-5 py-3`}>
                <Text style={tw`text-lg font-semibold mb-2 `}>
                  Differential Equations
                </Text>
                <View style={tw` w-full border-b border-gray-300 mb-5`}></View>

                <View style={tw` flex flex-row justify-between`}>
                  <View style={tw`flex flex-col`}>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Notes added: {4}
                    </Text>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Date created {formattedDate}
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
        </View>
        <View>
          <View style={tw` flex flex-row gap-x-2 items-center`}>
            <Text style={tw` text-xl text-black text-left font-semibold`}>
              Information Systems
            </Text>
            <TouchableOpacity style={tw``}>
              <AntDesign name="pluscircleo" size={17} color="blue" />
            </TouchableOpacity>
          </View>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}

          {/*Subject/course card */}
          <View style={tw`flex flex-row gap-x-3 w-full`}>
            <TouchableOpacity
              onPress={() => nav.navigate("AddedNotes")}
              style={tw`flex flex-row  items-center bg-white rounded-lg w-full`}
            >
              {/* COLOUR CODE */}
              <View
                style={tw`w-1/24 h-full bg-${colourCodes[3]}-500 rounded-l-lg`}
              >
                <Text> {/* NEEDED PLACE HOLDER FOR COLOUR CODE */} </Text>
              </View>

              {/* <AntDesign name="pptfile1" size={32} color="black" /> */}
              <View style={tw`flex flex-col w-9/10 px-5 py-3`}>
                <Text style={tw`text-lg font-semibold mb-2 `}>Big Data</Text>
                <View style={tw` w-full border-b border-gray-300 mb-5`}></View>

                <View style={tw` flex flex-row justify-between`}>
                  <View style={tw`flex flex-col`}>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Notes added: {3}
                    </Text>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Date created {formattedDate}
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
        </View>
        <View>
          <View style={tw` flex flex-row gap-x-2 items-center`}>
            <Text style={tw` text-xl text-black text-left font-semibold`}>
              Psychology
            </Text>
            <TouchableOpacity style={tw``}>
              <AntDesign name="pluscircleo" size={17} color="blue" />
            </TouchableOpacity>
          </View>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}

          {/*Subject/course card */}
          <View style={tw`flex flex-row gap-x-3 w-full`}>
            <TouchableOpacity
              onPress={() => nav.navigate("AddedNotes")}
              style={tw`flex flex-row  items-center bg-white rounded-lg w-full`}
            >
              {/* COLOUR CODE */}
              <View
                style={tw`w-1/24 h-full bg-${colourCodes[2]}-500 rounded-l-lg`}
              >
                <Text> {/* NEEDED PLACE HOLDER FOR COLOUR CODE */} </Text>
              </View>

              {/* <AntDesign name="pptfile1" size={32} color="black" /> */}
              <View style={tw`flex flex-col w-9/10 px-5 py-3`}>
                <Text style={tw`text-lg font-semibold mb-2 `}>Freudian</Text>
                <View style={tw` w-full border-b border-gray-300 mb-5`}></View>

                <View style={tw` flex flex-row justify-between`}>
                  <View style={tw`flex flex-col`}>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Notes added: {2}
                    </Text>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Date created {formattedDate}
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
        </View>
        <View>
          <View style={tw` flex flex-row gap-x-2 items-center`}>
            <Text style={tw` text-xl text-black text-left font-semibold`}>
              Chemistry
            </Text>
            <TouchableOpacity style={tw``}>
              <AntDesign name="pluscircleo" size={17} color="blue" />
            </TouchableOpacity>
          </View>
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}

          {/*Subject/course card */}
          <View style={tw`flex flex-row gap-x-3 w-full`}>
            <TouchableOpacity
              onPress={() => nav.navigate("AddedNotes")}
              style={tw`flex flex-row  items-center bg-white rounded-lg w-full`}
            >
              {/* COLOUR CODE */}
              <View
                style={tw`w-1/24 h-full bg-${colourCodes[1]}-500 rounded-l-lg`}
              >
                <Text> {/* NEEDED PLACE HOLDER FOR COLOUR CODE */} </Text>
              </View>

              {/* <AntDesign name="pptfile1" size={32} color="black" /> */}
              <View style={tw`flex flex-col w-9/10 px-5 py-3`}>
                <Text style={tw`text-lg font-semibold mb-2 `}>
                  Redox reactions
                </Text>
                <View style={tw` w-full border-b border-gray-300 mb-5`}></View>

                <View style={tw` flex flex-row justify-between`}>
                  <View style={tw`flex flex-col`}>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Notes added: {2}
                    </Text>
                    <Text style={tw`text-sm font-light text-gray-500`}>
                      Date created {formattedDate}
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
        </View>
        {/* </ScrollView> */}
        {/* <TouchableOpacity
          style={tw`mt-3 flex flex-row gap-x-2 items-center justify-center`}
        >
          <Text style={tw`text-md font-bold text-blue-500`}> Add Notes</Text>
          <AntDesign name="plus" size={24} color="blue" />
        </TouchableOpacity> */}
      </View>

      {/* <View style={tw`text-left my-5 gap-y-5`}>
        <Text style={tw`text-lg text-gray-400 font-semibold`}>
          Recently Viewed
        </Text>

        <View style={tw`justify-center items-center`}>
          {true ? ( //Will make a condition to be set to true if user has notes uploaded
            <Text style={tw`font-semibold text-md `}>Nothing added.</Text>
          ) : (
            <TouchableOpacity
              style={tw`flex flex-row gap-x-8 items-center bg-gray-200 rounded-lg py-4 px-2`}
            >
              <AntDesign name="pptfile1" size={32} color="black" />
              <View style={tw`flex flex-col gap-y-2`}>
                <Text style={tw`text-md font-semibold`}>CS Complier Notes</Text>
                <Text style={tw`text-md font-medium text-gray-500`}>
                  Date created {formattedDate}
                </Text>
              </View>
              <View style={tw`ml-4`}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View> */}
    </View>
  );
};

export default HomeComponent;
