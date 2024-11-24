import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/Navigation/AppNavigator";
import { QuizProvider } from "./src/config/QuizContext";
import { FlashCardsProvider } from "./src/config/FlashCardsContext";
import { SummaryProvider } from "./src/config/SummaryContext";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "./src/config/Database";
import { MockQuestionsProvider } from "./src/config/MockQuestionsContext";
import { TermsProvider } from "./src/config/TermsContext";

export default function App() {
  return (
    <SQLiteProvider databaseName="user_chats.db" onInit={migrateDbIfNeeded}>
      <MockQuestionsProvider>
        <TermsProvider>
          <SummaryProvider>
            <QuizProvider>
              <FlashCardsProvider>
                <AppNavigator />
              </FlashCardsProvider>
            </QuizProvider>
          </SummaryProvider>
        </TermsProvider>
      </MockQuestionsProvider>
    </SQLiteProvider>
  );
}
