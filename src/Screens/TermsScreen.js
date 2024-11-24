import React, { useContext } from "react";
import { View, Text, Image } from "react-native";

import tw from "twrnc";

import { TermsContext } from "../config/TermsContext";

const TermsScreen = () => {
  const { terms } = useContext(TermsContext);

  if (!terms || terms.length === 0) {
    return (
      <>
        <View style={tw`mt-30 flex flex-col gap-5 items-center justify-center`}>
          <Image
            source={require("../../assets/NoNotes.png")}
            style={tw`w-[120px] h-[120px]`}
          />
          <Text style={tw`mt-4 text-2xl text-center font-bold`}>
            Oops Notes Not Found! Get Started On The Homepage!
          </Text>
        </View>
      </>
    );
  }

  return (
    <View style={tw`flex flex-col gap-y-4 mb-5`}>
      {terms.map((item, index) => (
        <View
          key={index}
          style={tw` rounded-2xl bg-gray-100 p-4 flex flex-col gap-y-2`}
        >
          <Text style={tw`font-semibold text-xl`}>{item.term}</Text>
          <Text style={tw`font-semibold text-md font-light text-gray-500`}>
            {item.definition}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default TermsScreen;
