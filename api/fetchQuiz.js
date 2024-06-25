const generateQuiz = async () => {
  const response = await fetch("/generate-quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notes }),
  });
  const quiz = await response.json();
  console.log(quiz);
};
