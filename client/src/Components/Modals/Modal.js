import {
  View,
  Text,
  Modal as RModal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import tw from "twrnc";

export const Modal = ({ isOpen, withInput, children, ...rest }) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={tw`items-center justify-center flex-1 px-3 bg-zinc-900/40`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={tw`items-center justify-center flex-1 px-3 bg-zinc-900/40`}>
      {children}
    </View>
  );

  return (
    <RModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RModal>
  );
};
