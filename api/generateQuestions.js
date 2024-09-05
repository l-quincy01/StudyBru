const express = require("express");
const bodyParser = require("body-parser");
const { OpenAIApi, OpenAI } = require("openai");

// Initialize OpenAI API
const openai = new OpenAI({});

const app = express();
app.use(bodyParser.json());

const generateTerms = async (notes) => {
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant that generates Terms and Definitions. YOUR RESPONSE SHOULD BE STRICTLY IN THIS FORMAT ONLY:
        { term: "I.E The term here",
    definition: "I.E The definition here"}, `,
    },
    {
      role: "user",
      content: `Generate Terms and Definitions for the following notes: \n\n${notes}\n\n YOUR RESPONSE SHOULD BE STRICTLY IN THIS FORMAT ONLY:
        { term: "I.E The term here",
    definition: "I.E The definition here" },`,
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
const generateQuestions = async (notes) => {
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant that generates mock questions and answers. YOUR RESPONSE SHOULD BE STRICTLY IN THIS FORMAT ONLY:
        { question: "I.E The question here",
    answer: "I.E The answer here here" }, `,
    },
    {
      role: "user",
      content: `Generate a questions and answers for the following notes: \n\n${notes}\n\n YOUR RESPONSE SHOULD BE STRICTLY IN THIS FORMAT ONLY:
        { question: "I.E The question here",
    answer: "I.E The answer here here" },`,
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

app.post("/generate-terms", async (req, res) => {
  const { notes } = req.body;
  try {
    const terms = await generateTerms(notes);
    res.json({ terms });
    console.log("TERMS ---------------------------------------------", terms);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/generate-questions", async (req, res) => {
  const { notes } = req.body;
  try {
    const questions = await generateQuestions(notes);
    res.json({ questions });
    console.log(
      "QUESTIONS ---------------------------------------------",
      questions
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3007, () => {
  console.log("Server is running on port 3007");
});
