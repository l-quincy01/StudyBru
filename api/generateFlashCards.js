const express = require("express");
const bodyParser = require("body-parser");
const { OpenAIApi, OpenAI } = require("openai");

// Initialize OpenAI API
const openai = new OpenAI();

const app = express();
app.use(bodyParser.json());

const generateFlashCards = async (notes) => {
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant that generates several flashcards for study notes. YOUR RESPONSE SHOULD BE STRICTLY IN THIS EXAMPLE FORMAT ONLY: {
    front: "The Zürich P‐System kit",
    back: "To use the kit, it was necessary to develop a native-code version of the P-Machine emulator using some locally available host language (Fortran, Assembler …)",
  },
       `,
    },
    {
      role: "user",
      content: `Generate flashcards based on the following notes:\n\n${notes}\n\nProvide multiple-choice and true/false questions and answers. YOUR RESPONSE SHOULD BE STRICTLY IN THIS EXAMPLE FORMAT ONLY
       {
    front: "The Zürich P‐System kit",
    back: "To use the kit, it was necessary to develop a native-code version of the P-Machine emulator using some locally available host language (Fortran, Assembler …)",
  },`,
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

app.post("/generate-flashCards", async (req, res) => {
  const { notes } = req.body;
  try {
    const flashCards = await generateFlashCards(notes);
    res.json({ flashCards });
    console.log(flashCards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
