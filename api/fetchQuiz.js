const generateQuiz = async (notes, setQuiz) => {
  const response = await fetch("/generate-quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notes }),
  });
  const quiz = await response.json();
  setQuiz(quiz);
  console.log(quiz);
};

module.exports = {
  generateQuiz,
};
