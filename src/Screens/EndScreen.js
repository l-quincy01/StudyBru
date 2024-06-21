import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";

const EndScreen = ({ navigation }) => {
  const route = useRoute();

  const { userScore } = route.params;

  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/quizIcon.jpeg")}
        style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
      />
      <Text>
        Congrats you finished the quiz!! Your score {userScore} points{" "}
      </Text>

      <Pressable
        style={tw`bg-green-500  text-center p-4 rounded-xl mt-4`}
        onPress={() => navigation.navigate("Splash")}
      >
        <Text style={tw`text-white text-md font-bold`}>Play Again</Text>
      </Pressable>
    </View>
  );
};

export default EndScreen;

const styles = StyleSheet.create({});
