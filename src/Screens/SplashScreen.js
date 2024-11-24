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
import HomeComponentMainModal from "../Components/Modals/HomeComponentMainModal";
import { TermsContext } from "../config/TermsContext";
import { MockQuestionsContext } from "../config/MockQuestionsContext";

//parsers
import parseFlashCards from "../Parsers/parseFlashCards";
import parseTerms from "../Parsers/parseTerms";
import parseQuestions from "../Parsers/parseQuestions";
import parseQuiz from "../Parsers/parseQuiz";

//services
import documentUploadService from "../Services/documentUploadService";
import fileUploadService from "../Services/fileUploadService";
//import pickDocument from "../Services/pickDocument.js";

import generateFlashCardsService from "../Services/generateFlashCardsService";
import generateQuizService from "../Services/generateQuizService";
import generateSummariesService from "../Services/generateSummariesService";
import generateTermsService from "../Services/generateTermsService";
import generateTitleService from "../Services/generateTitleService";
import generateQuestionsService from "../Services/generateQuestionsService";

//utils
import cleanText from "../Utilities/cleanText";
import removeTriplebackticks from "../Utilities/removeTriplebackticks";

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

  //because  expo-document-picker only supports expoCLI only
  const pickDocument = async () => {
    console.log("Document picker opened");
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.assets[0].uri) {
      console.log("Document picked successfully");
      setSelectedFile(result);
      await documentUploadService(result, setNotes, cleanText);
    } else {
      console.log("Document picker cancelled or failed");
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
      generateFlashCardsService(notes, setFlashCards);
      generateQuizService(notes, setQuiz);
      generateSummariesService(notes, setSummary);
      generateQuestionsService(notes, setQuestions);
      generateTermsService(notes, setTerms);
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
                <HomeComponent nav={navigation} docPicker={pickDocument} />
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
