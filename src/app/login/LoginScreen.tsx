import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { useAuth } from "@/src/context/AuthContext";
import Layout from "@/src/components/Layout/Layout";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);

    if (result && result.error) {
      alert(result.msg);
    }
  };
  const register = async () => {
    const result = await onRegister!(email, password);

    if (result && result.error) {
      alert(result.msg);
    } else {
      login(); //automatically call login after registration
    }
  };

  return (
    <Layout>
      <ThemedView className=" flex flex-col gap-y-5 ">
        <ThemedText type="title">
          <Text className=" text-4xl font-bold">Get Started </Text>
        </ThemedText>
        <ThemedView className=" flex flex-col gap-y-1 ">
          <ThemedText>Email</ThemedText>
          <TextInput
            className="p-3 "
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </ThemedView>
      </ThemedView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
