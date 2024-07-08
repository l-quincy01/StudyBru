import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/Navigation/AppNavigator";
import { QuizProvider } from "./src/config/QuizContext";
import { FlashCardsProvider } from "./src/config/FlashCardsContext";

export default function App() {
  return (
    <QuizProvider>
      <FlashCardsProvider>
        <AppNavigator />
      </FlashCardsProvider>
    </QuizProvider>
  );
}
