import axios from "axios";

const generateFlashCardsService = async (
  notes,
  parseFlashCards,
  setFlashCards
) => {
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

export default generateFlashCardsService;
