import axios from "axios";

const generateTermsService = async (notes, setTerms, parseTerms) => {
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

export default generateTermsService;
