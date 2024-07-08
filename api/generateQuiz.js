const express = require("express");
const bodyParser = require("body-parser");
const { OpenAIApi, OpenAI } = require("openai");

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: "API KEY HERE",
});

const app = express();
app.use(bodyParser.json());

const generateQuizQuestions = async (notes) => {
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant that generates quiz questions and answers.YOUR RESPONSE SHOULD BE STRICTLY IN THIS FORMATONLY
        { question: "What is a variable in programming?",
    options: ["A storage location", "A function", "A loop", "A class"],
    correctAnswer: "A storage location",},`,
    },
    {
      role: "user",
      content: `Generate a quiz based on the following notes:\n\n${notes}\n\nProvide multiple-choice and true/false questions and answers. YOUR RESPONSE SHOULD BE STRICTLY IN THIS FORMATONLY
        { question: "What is a variable in programming?",
    options: ["A storage location", "A function", "A loop", "A class"],
    correctAnswer: "A storage location",},`,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    max_tokens: 3500,
    n: 1,
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

app.post("/generate-quiz", async (req, res) => {
  const { notes } = req.body;
  try {
    const questions = await generateQuizQuestions(notes);
    res.json({ questions });
    console.log(questions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
