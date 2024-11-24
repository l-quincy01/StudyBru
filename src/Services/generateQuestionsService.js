import axios from "axios";
//helper
const generateQuestionsService = async (notes, setQuestions) => {
  try {
    const response = await axios.post(
      "http://192.168.68.100:3007/generate-questions",
      { notes: notes },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response:", response.data); // Log response for debugging
    if (Array.isArray(response.data)) {
      setQuestions(response.data); // Directly set the questions
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error(
      "Error generating questions:",
      error.message,
      error.response?.data || error
    );
  }
};

export default generateQuestionsService;
