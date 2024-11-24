import axios from "axios";

//helper
const parseTerms = (inputString) => {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const termsBlocks = inputString.match(/\{[^}]+\}/g);
  const result = [];
  termsBlocks.forEach((block) => {
    const termMatch = block.match(/term: "(.*?)"/);
    const definitionMatch = block.match(/definition: "(.*?)"/);
    if (termMatch && definitionMatch) {
      result.push({ term: termMatch[1], definition: definitionMatch[1] });
    }
  });
  return result;
};

const generateTermsService = async (notes, setTerms) => {
  try {
    const response = await axios.post(
      "http://192.168.68.100:3007/generate-terms",
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

export default generateTermsService;
