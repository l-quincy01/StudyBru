import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const NotesDocumentView = ({ navigation, route }) => {
  const { uri } = route.params;

  return (
    <View style={tw`flex-1 mt-12`}>
      {/*Top view */}
      <View
        style={tw`flex flex-row items-center justify-between border-b border-gray-200 py-5 px-5`}
      >
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={28} color="black" />
          <Text style={tw`font-semibold text-lg`}>Library</Text>
        </TouchableOpacity>
      </View>

      <WebView
        onLoad={() => console.log("WebView loaded with:", uri)}
        source={{ uri: `http://172.20.10.7:4001${uri}` }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default NotesDocumentView;
