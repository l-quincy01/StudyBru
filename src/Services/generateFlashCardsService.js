import axios from "axios";

//Helper functions
const parseFlashCards = (inputString) => {
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
};

const generateFlashCardsService = async (notes, setFlashCards) => {
  try {
    const response = await axios.post(
      "http://192.168.68.100:3003/generate-flashCards",
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
