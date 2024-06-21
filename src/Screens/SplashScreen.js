import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
const SplashScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/quizIcon.jpeg")}
        style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
      />
      {/*Quiz Heading */}
      <Text style={tw`text-3xl text-center font-semibold`}>
        {" "}
        Quiz Instructions
      </Text>

      <View
        style={tw`flex text-center justify-center items-center bg-green-500 mt-10 p-2 w-90 rounded-xl`}
      >
        <Text style={tw`text-white text-lg `}>Each Quiz has Four Options</Text>
        <Text style={tw`text-white text-lg `}>
          Progress Will Be Shown At The Top
        </Text>
        <Text style={tw`text-white text-lg `}>
          Score Will Be Shown At The End
        </Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Questions")}
        style={tw`bg-green-500 mt-10 pl-4 pr-5 py-1 rounded-xl `}
      >
        <Text style={tw`text-white text-lg`}> Start</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
