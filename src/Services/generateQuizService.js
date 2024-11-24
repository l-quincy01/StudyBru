import axios from "axios";

//helper
const parseQuiz = (inputString) => {
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
};

const generateQuizService = async (notes, setQuiz) => {
  try {
    const response = await axios.post(
      "http://192.168.68.100:3000/generate-quiz",
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
