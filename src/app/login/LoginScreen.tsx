import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { useAuth } from "@/src/context/AuthContext";

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
    <ThemedView style={styles.container}>
      <ThemedText>Login!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
