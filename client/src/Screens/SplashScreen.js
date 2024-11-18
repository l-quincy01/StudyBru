import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import tw from "twrnc";
import axios from "axios";
import { QuizContext } from "../config/QuizContext";
import { FlashCardsContext } from "../config/FlashCardsContext";
import { SummaryContext } from "../config/SummaryContext";
import GetStartedComponent from "../Components/GetStartedComponent";
import HomeComponent from "../Components/HomeComponent";
import {
  AntDesign,
  Entypo,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { TextInput } from "react-native-paper";
import HomeComponentMainModal from "../Components/HomeComponentMainModal";
import { TermsContext } from "../config/TermsContext";
import { MockQuestionsContext } from "../config/MockQuestionsContext";

//parsers
import { parseFlashCards } from "../Parsers/parseFlashCards";
import { parseTerms } from "../Parsers/parseTerms";
import { parseQuestions } from "../Parsers/parseQuestions";
import { parseQuiz } from "../Parsers/parseQuiz";

//services
import { documentUploadService } from "../Services/documentUploadService";
import { fileUploadService } from "../Services/fileUploadService";
import { pickDocument } from "../Services/pickDocument";

import { generateFlashCardsService } from "../Services/generateFlashCardsService";
import { generateQuizService } from "../Services/generateQuizService";
import { generateSummariesService } from "../Services/generateSummariesService";
import { generateTermsService } from "../Services/generateTermsService";
import { generateTitleService } from "../Services/generateTitleService";

//utils
import { cleanText } from "../Utilities/cleanText";
import { removeTriplebackticks } from "../Utilities/removeTriplebackticks";

const SplashScreen = ({ navigation }) => {
  const { quiz, setQuiz } = useContext(QuizContext);
  const { summary, setSummary } = useContext(SummaryContext);
  const { flashCards, setFlashCards } = useContext(FlashCardsContext);
  const { terms, setTerms } = useContext(TermsContext);
  const { questions, setQuestions } = useContext(MockQuestionsContext);

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [notesTitle, setNotesTitle] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [setsTitle, setSetsTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //pass as a prop
  const getParseEndpoint = (mimeType) => {
    switch (mimeType) {
      case "application/pdf":
        return "http://172.20.10.7:3001/parse-pdf";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "http://172.20.10.7:3001/parse-docx";
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "http://172.20.10.7:3001/parse-pptx";
      default:
        throw new Error("Unsupported file type");
    }
  };

  useEffect(() => {
    if ((quiz, flashCards, summary, terms, questions)) {
      setNotes("");
    }
  }, [quiz, flashCards, summary, terms, questions]);

  useEffect(() => {
    if (notes) {
      setLoading(true);
      // generateQuiz(notes);
      // generateFlashCards(notes);
      // generateSummaries(notes);
      // generateTitle(notes);
      // generateQuestions(notes);
      // generateTerms(notes);
      generateFlashCardsService(notes, parseFlashCards, setFlashCards);
      generateQuizService(notes, setQuiz, parseQuiz);
      generateSummariesService(notes, setSummary, removeTriplebackticks);
      generateTermsService(notes, setTerms, parseTerms);
      generateTitleService(notes, setNotesTitle);
    }
  }, [notes]);
  useEffect(() => {
    console.log("isModal Value:", isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    if (
      quiz.length > 0 &&
      flashCards.length > 0 &&
      summary.length > 0 &&
      terms.length > 0 &&
      questions.length > 0
    ) {
      setLoading(false);
    }
  }, [quiz, flashCards, summary, terms, questions]);

  useEffect(() => {
    if (notesTitle) {
      fileUploadService(selectedFile, notesTitle, subjectTitle, setsTitle);
    }
  }, [notesTitle]);

  const pickDocument = async () => {
    console.log("Document picker opened");
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.assets[0].uri) {
      console.log("Document picked successfully");
      setSelectedFile(result);
      await documentUploadService(result, getParseEndpoint, cleanText);
    } else {
      console.log("Document picker cancelled or failed");
    }
  };

  const generateQuiz = async (notes) => {
    try {
      const response = await axios.post(
        "http://172.20.10.7:3000/generate-quiz",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setQuiz(parseQuiz(response.data.questions));
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  // const generateFlashCards = async (notes) => {
  //   try {
  //     const response = await axios.post(
  //       "http://172.20.10.7:3003/generate-flashCards",
  //       { notes: notes },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setFlashCards(parseFlashCards(response.data.flashCards));
  //   } catch (error) {
  //     console.error("Error generating flashcards:", error);
  //   }
  // };

  // const generateSummaries = async (notes) => {
  //   try {
  //     const response = await axios.post(
  //       "http://172.20.10.7:3004/generate-summary",
  //       { notes: notes },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setSummary(removeTriplebackticks(response.data.summary));
  //   } catch (error) {
  //     console.error("Error generating summary:", error);
  //   }
  // };

  const generateTitle = async (notes) => {
    try {
      const response = await axios.post(
        "http://172.20.10.7:3006/generate-title",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNotesTitle(response.data.title);
    } catch (error) {
      console.error("Error generating title:", error);
    }
  };

  const generateTerms = async (notes) => {
    try {
      const response = await axios.post(
        "http://172.20.10.7:3007/generate-terms",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTerms(parseTerms(response.data.terms));
    } catch (error) {
      console.error("Error generating terms:", error);
    }
  };

  const generateQuestions = async (notes) => {
    try {
      const response = await axios.post(
        "http://172.20.10.7:3007/generate-questions",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setQuestions(parseQuestions(response.data.questions));
    } catch (error) {
      console.error("Error generating questions:", error);
    }
  };

  return (
    <View style={tw`flex-1 mt-12 `}>
      {loading ? (
        <View
          style={[tw`justify-center items-center`, styles.loadingContainer]}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          {/*Top view */}
          <View
            style={tw`flex flex-row items-center justify-between border-b border-gray-200 py-5 px-5`}
          >
            <View style={tw`flex flex-row gap-x-2 items-center`}>
              <SimpleLineIcons name="fire" size={24} color="black" />
              <Text style={tw`font-bold text-lg`}>0</Text>
            </View>
            <TouchableOpacity
              style={tw``}
              onPress={() => navigation.navigate("Profile")}
            >
              <AntDesign name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/*Body view */}

          <ScrollView style={tw`flex-1 px-5 bg-gray-100`}>
            {quiz.length > 0 &&
            flashCards.length > 0 &&
            summary.length > 0 &&
            terms.length > 0 &&
            questions.length > 0 ? (
              <>
                <HomeComponent
                  nav={navigation}
                  docPicker={pickDocument}
                  setsTitle={setsTitle}
                  onSubjectTitleChange={setSubjectTitle}
                  subjectTitle={subjectTitle}
                  onSetsTitleChange={setSetsTitle}
                />
              </>
            ) : (
              <GetStartedComponent
                docPicker={pickDocument}
                subjectTitle={subjectTitle}
                setsTitle={setsTitle}
                onSubjectTitleChange={setSubjectTitle}
                onSetsTitleChange={setSetsTitle}
              />
            )}
          </ScrollView>

          {quiz.length > 0 &&
            flashCards.length > 0 &&
            summary.length > 0 &&
            terms.length > 0 &&
            questions.length > 0 && (
              <>
                <HomeComponentMainModal
                  docPicker={pickDocument}
                  subjectTitle={subjectTitle}
                  setsTitle={setsTitle}
                  onSubjectTitleChange={setSubjectTitle}
                  onSetsTitleChange={setSetsTitle}
                />
              </>
            )}
        </>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 10000,
  },
});
