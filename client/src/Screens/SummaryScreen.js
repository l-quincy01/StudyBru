import React, { useState, useRef, useContext } from "react";
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlashCardsContext } from "../config/FlashCardsContext";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Markdown from "react-native-markdown-display";
import { SummaryContext } from "../config/SummaryContext";

//import { flashCards } from "../config/FlashCards";

const SummaryScreen = ({ navigation }) => {
  const { summary } = useContext(SummaryContext);

  // if (!flashCards || flashCards.length === 0) {
  //   return (
  //     <View style={tw`flex-1 items-center justify-center  p-5`}>
  //       <Text style={tw`font-semibold text-xl text-center`}>
  //         Upload Notes On Home Page To Get Started.
  //       </Text>
  //     </View>
  //   );
  // }
  const copy = `# Lecture 5: Programming Language Translation

**Instructor:** Karen Bradshaw  
**Covered Topics:** Chapter 2 (pp. 21–24) and Chapter 3  

## The Zürich P‐System Kit

### Components
- **Source Code:** Pascal to P-code compiler, written in Pascal.
- **Object Code:** Version of the Pascal compiler, in P-code.
- **P-Machine Emulator:** Source code written in Pascal.

### Usage
- Developing a native code version of the P-Machine emulator using a locally available host language (e.g., Fortran, Assembler).

## Compilation and Execution Using the P‐System

- Discussion on how the P-System facilitates compilation and execution, allowing for cross-platform compatibility and easier development of compilers.

## Key Concepts

### Developing the First Compiler
- Challenges in developing the first compiler for a new programming language.

### Porting and Using a High-Level Translator
- Porting a high-level (X to C) compiler to a new machine using an existing C compiler on the new machine.
- Utilizing a high-level compiler as the first stage of a two-stage compiler, with the C compiler providing the final stage.

### Use of C as an Implementation Language
- C is widely available on most computers, making it a practical choice for developing compilers using C as the host language.

### Development with a Compiler Generator
- Modern compilers often use a compiler generator, which takes a formal description of the language and generates source code for part of the compiler.

## Bootstrapping Compilers

### Full Bootstrap of an Assembler
- Developing a simple version from scratch and gradually advancing to more powerful versions, transitioning from M-code to Assembler.

### Self-Compiling Compilers
- Initial compiler versions are developed using a different language (original host language).
- Producing a second source code version of the compiler using the source language as the host language and compiling it with the first version.
- The object version of this compiler should reproduce the same object code when compiling its own source code.

### The Half Bootstrap
- First Pascal compilers were developed in Zürich on a CDC mainframe.
- The process ended with a self-compiling compiler in two forms.
- In Belfast, the Pascal compiler needed for an ICL mainframe involved retargeting the backend to produce a cross-compiler.
- Running the cross-compiler on the CDC machine produced the object code version for the ICL machine.

## Next Lecture

**Preparation:** Read Chapter 4, pp. 34–38

`;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`flex-1 flex-col p-5 gap-y-8`}>
          {/* Summary Heading */}
          <Text style={tw`text-3xl font-semibold`}> Notes Summary</Text>
          <View style={tw`border-b border border-gray-200 w-1/2`}></View>
          {/* Buttons */}
          <View style={tw`flex flex-row gap-x-3`}>
            <View style={tw` p-2 border border-2 rounded-full`}>
              <Entypo name="documents" size={24} color="black" />
            </View>

            <View style={tw` p-2 border border-2 rounded-full`}>
              <AntDesign name="question" size={24} color="black" />
            </View>
            <View style={tw` p-2 border border-2 rounded-full`}>
              <MaterialCommunityIcons name="brain" size={24} color="black" />
            </View>
          </View>
          {/* <View style={tw`border-b border border-gray-200 w-1/2`}></View> */}
          {/* <Image
            source={require("../../assets/underlineIcon.png")}
            style={tw.style(tw``)}
          /> */}

          <View>
            <Markdown>{summary}</Markdown>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flashCardContainer: {
    width: 300,
    height: 400,
  },
  flashCard: {
    height: 400,
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden",
  },
});

export default SummaryScreen;
