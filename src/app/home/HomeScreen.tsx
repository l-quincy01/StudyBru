import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>HomeScreen!</ThemedText>
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
