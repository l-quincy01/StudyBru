import axios from "axios";

const generateQuizService = async (notes, setQuiz, parseQuiz) => {
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

export default generateQuizService;
