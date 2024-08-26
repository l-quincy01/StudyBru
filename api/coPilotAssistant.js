const express = require("express");
const bodyParser = require("body-parser");
const { OpenAIApi, OpenAI } = require("openai");

// Initialize OpenAI API
const openai = new OpenAI({});

const app = express();
app.use(bodyParser.json());

const generateSummary = async (notes) => {
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant that generates study notes summaries. YOUR RESPONSE SHOULD BE STRICTLY IN MARKDOWN LIKE FORMAT  WITHOUT ANY BACKTICKS`,
    },
    {
      role: "user",
      content: `Generate a SUMMARY based on the following notes: \n\n${notes}\n\n YOUR RESPONSE SHOULD BE STRICTLY IN  MARKDOWN LIKE FORMAT WITHOUT ANY BACKTICKS`,
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

app.post("/generate-summary", async (req, res) => {
  const { notes } = req.body;
  try {
    const summary = await generateSummary(notes);
    res.json({ summary });
    console.log(summary);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3004, () => {
  console.log("Server is running on port 3004");
});
