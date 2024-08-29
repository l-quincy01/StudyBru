import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import {
  Alert,
  Share,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import {
  AntDesign,
  Entypo,
  Fontisto,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import axios from "axios";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QuizContext } from "../config/QuizContext";
import { FlashCardsContext } from "../config/FlashCardsContext";
import { SummaryContext } from "../config/SummaryContext";

function removeTripleBackticks(text) {
  return text.replace(/```/g, "");
}

function parseFlashCards(inputString) {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const flashCardBlocks = inputString.match(/\{[^}]+\}/g);
  const result = [];
  flashCardBlocks.forEach((block) => {
    const frontMatch = block.match(/front: "(.*?)"/);
    const backMatch = block.match(/back: "(.*?)"/);
    if (frontMatch && backMatch) {
      result.push({ front: frontMatch[1], back: backMatch[1] });
    }
  });
  return result;
}

function parseQuiz(inputString) {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const questionBlocks = inputString.match(/\{[^}]+\}/g);
  const result = [];
  questionBlocks.forEach((block) => {
    const question = block.match(/question: "(.*?)"/)[1];
    const options = block
      .match(/options: \[(.*?)\]/)[1]
      .split('", "')
      .map((option) => option.replace(/^"|"$/g, ""));
    const correctAnswer = block.match(/correctAnswer: "(.*?)"/)[1];
    result.push({ question, options, correctAnswer });
  });
  return result;
}

const AddedNotesScreen = ({ navigation }) => {
  const [databaseNotes, setDatabaseNotes] = useState([]); // Updated variable name
  const [selectedNoteTitle, setSelectedNoteTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { quiz, setQuiz } = useContext(QuizContext);
  const { summary, setSummary } = useContext(SummaryContext);
  const { flashCards, setFlashCards } = useContext(FlashCardsContext);
  const cleanText = (text) => {
    return text.replace(/\s+/g, " ");
  };

  // Modified uploadDocument function to accept a PDF URL
  const uploadDocument = async (pdfUrl) => {
    const formData = new FormData();
    formData.append("file", {
      uri: pdfUrl,
      type: "application/pdf",
      name: pdfUrl.split("/").pop(),
    });

    try {
      const parseEndpoint = "http://172.20.10.7:3001/parse-pdf";
      const parseResponse = await axios.post(parseEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const parsedText = cleanText(parseResponse.data.text);
      console.log("PDF parsed successfully", parsedText);

      // Generate quiz, flashcards, and summary from the note content
      await generateQuiz(parsedText);
      await generateFlashCards(parsedText);
      await generateSummaries(parsedText);
    } catch (error) {
      console.error("Error processing PDF:", error);
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

  const generateFlashCards = async (notes) => {
    try {
      const response = await axios.post(
        "http://172.20.10.7:3003/generate-flashCards",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFlashCards(parseFlashCards(response.data.flashCards));
    } catch (error) {
      console.error("Error generating flashcards:", error);
    }
  };

  const generateSummaries = async (notes) => {
    try {
      const response = await axios.post(
        "http://172.20.10.7:3004/generate-summary",
        { notes: notes },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSummary(removeTripleBackticks(response.data.summary));
    } catch (error) {
      console.error("Error generating summary:", error);
    }
  };

  const handleSetActiveNote = async (note) => {
    try {
      setLoading(true); // Show loading spinner
      const pdfUrl = `http://172.20.10.7:4001${note.filePath}`;

      // Use the uploadDocument function to handle the PDF processing
      await uploadDocument(pdfUrl);

      console.log("Note set as active successfully.");
    } catch (error) {
      console.error("Error setting note as active:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    axios
      .get("http://172.20.10.7:4001/user-notes")
      .then(({ data }) => {
        setDatabaseNotes(data); // Updated variable name
      })
      .catch((error) => {
        console.error("Error fetching user notes:", error);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => ["45%"], []);
  const bottomSheetRef = useRef(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = (title) => {
    setSelectedNoteTitle(title); // Set the selected note title
    bottomSheetRef.current?.expand();
    setIsOpen(true);
  };

  const handleSheetClose = () => {
    setIsOpen(false);
    setSelectedNoteTitle(""); // Clear the title when the sheet is closed
  };

  const onShare = async (title) => {
    try {
      const result = await Share.share({
        message: `Hey look at my notes! |${title}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {loading ? (
        <View
          style={[tw`justify-center items-center`, styles.loadingContainer]}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={tw`flex-1 mt-12`}>
            <TouchableWithoutFeedback onPress={handleClosePress}>
              <View
                style={tw.style("flex-1", isOpen && "bg-gray-100 opacity-20")}
              >
                {/* Top view */}
                <View
                  style={tw`flex flex-row items-center justify-between border-b border-gray-200 py-5 px-5`}
                >
                  <TouchableOpacity
                    style={tw`flex flex-row items-center justify-center`}
                    onPress={() => navigation.goBack()}
                  >
                    <Entypo name="chevron-left" size={28} color="black" />
                    <Text style={tw`font-semibold text-lg`}>Library</Text>
                  </TouchableOpacity>
                </View>

                <View style={tw`flex-1 px-5 bg-gray-100`}>
                  <View style={tw`flex flex-col mt-4 justify-center gap-y-8`}>
                    <View style={tw`flex flex-row gap-x-2 items-center`}>
                      <Text
                        style={tw`text-2xl text-black text-left font-semibold`}
                      >
                        Computer Science
                      </Text>
                    </View>

                    <ScrollView style={tw`flex flex-col gap-y-2`}>
                      {databaseNotes.map(
                        (
                          note,
                          index // Updated variable name
                        ) => (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("NotesDocumentView", {
                                uri: note.filePath,
                              })
                            }
                            key={index}
                            style={tw`my-2 py-3 flex flex-row items-start bg-white rounded-lg w-full`}
                          >
                            <View style={tw`ml-2`}>
                              <Image
                                source={require("../../assets/imgPlaceholder.png")}
                                style={tw`w-[75px] h-[75px]`}
                              />
                            </View>

                            <View style={tw`flex flex-col w-9/10 px-5`}>
                              <Text
                                style={tw`text-md font-semibold mb-2 w-3/4`}
                              >
                                {note.title}
                              </Text>
                              <View
                                style={tw`w-4/5 border-b border-gray-300 mb-2`}
                              ></View>

                              <View style={tw`flex flex-row justify-between`}>
                                <View style={tw`flex flex-col`}>
                                  <Text
                                    style={tw`text-sm font-light text-gray-500`}
                                  >
                                    {new Date(
                                      note.uploadedAt
                                    ).toLocaleDateString()}{" "}
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={tw`left-45 flex flex-row items-center gap-x-2`}
                              >
                                <TouchableOpacity>
                                  <SimpleLineIcons
                                    onPress={() => handleOpenPress(note.title)} // Pass the title when opening the sheet
                                    name="options"
                                    size={20}
                                    color="black"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      )}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {isOpen && (
              <TouchableWithoutFeedback onPress={handleClosePress}>
                <View
                  style={tw`absolute top-0 left-0 right-0 bottom-0 bg-gray-300 opacity-20 z-10`}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            index={-1}
            onClose={handleSheetClose}
            style={tw`flex flex-col `}
          >
            <Text style={tw` px-5 font-semibold mb-5 text-left text-md`}>
              {selectedNoteTitle || "Options"}{" "}
            </Text>

            <View style={tw`flex flex-col gap-y-4 px-5`}>
              <TouchableOpacity
                onPress={() =>
                  handleSetActiveNote(
                    databaseNotes.find(
                      (note) => note.title === selectedNoteTitle
                    )
                  )
                }
                style={tw`flex flex-row gap-x-4 items-center`}
              >
                <Ionicons name="checkbox-outline" size={24} color="black" />
                <Text style={tw`font-normal text-gray-500 text-sm`}>
                  Set as active
                </Text>
              </TouchableOpacity>
              <View style={tw`border-b border-gray-300 w-full mb-1`}></View>
              <TouchableOpacity
                onPress={() =>
                  onShare(
                    databaseNotes.find(
                      (note) => note.title === selectedNoteTitle
                    ).title
                  )
                }
                style={tw`flex flex-row gap-x-4 items-center`}
              >
                <Entypo name="share-alternative" size={24} color="black" />
                <Text style={tw`font-normal text-gray-500 text-sm`}>Share</Text>
              </TouchableOpacity>
              <View style={tw`border-b border-gray-300 w-full mb-1`}></View>
              <TouchableOpacity style={tw`flex flex-row gap-x-4 items-center`}>
                <MaterialIcons name="open-in-new" size={24} color="black" />
                <Text style={tw`font-normal text-gray-500 text-sm`}>Open</Text>
              </TouchableOpacity>
              <View style={tw`border-b border-gray-300 w-full mb-1`}></View>
              <TouchableOpacity style={tw`flex flex-row gap-x-4 items-center`}>
                <AntDesign name="delete" size={24} color="black" />
                <Text style={tw`font-normal text-gray-500 text-sm`}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </>
      )}
    </GestureHandlerRootView>
  );
};

export default AddedNotesScreen;

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
