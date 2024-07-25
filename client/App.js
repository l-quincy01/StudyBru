import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/Navigation/AppNavigator";
import { QuizProvider } from "./src/config/QuizContext";
import { FlashCardsProvider } from "./src/config/FlashCardsContext";
import { SummaryProvider } from "./src/config/SummaryContext";

export default function App() {
  return (
    <SummaryProvider>
      <QuizProvider>
        <FlashCardsProvider>
          <AppNavigator />
        </FlashCardsProvider>
      </QuizProvider>
    </SummaryProvider>
  );
}
