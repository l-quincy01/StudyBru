import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/Navigation/AppNavigator";
import { QuizProvider } from "./src/config/QuizContext";
import { MagicNotesProvider } from "./src/config/MagicNotesContext";

export default function App() {
  return (
    <QuizProvider>
      <MagicNotesProvider>
        <AppNavigator />
      </MagicNotesProvider>
    </QuizProvider>
  );
}
