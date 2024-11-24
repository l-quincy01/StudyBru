import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BottomSheet = () => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      onClose={handleSheetClose}
      style={tw`flex flex-col `}
      // backgroundStyle={tw`bg-gray-100`}
    >
      <Text style={tw`font-semibold mb-5 text-center text-lg`}>Options</Text>

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
        <View style={tw`border-b border-gray-300 w-full mb-1`}></View>
        <TouchableOpacity style={tw`flex flex-row gap-x-4 items-center`}>
          <AntDesign name="delete" size={24} color="black" />
          <Text style={tw`font-normal text-gray-500 text-sm`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
