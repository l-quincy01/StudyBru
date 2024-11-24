const express = require("express");
const bodyParser = require("body-parser");
const { OpenAIApi, OpenAI } = require("openai");

// Initialize OpenAI API
const openai = new OpenAI({});

const app = express();
app.use(bodyParser.json());

const generateTitle = async (notes) => {
  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant that generates ssimple titles for study notes`,
    },
    {
      role: "user",
      content: `Generate a simple title based on the following notes: \n\n${notes}\n\n `,
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

app.post("/generate-title", async (req, res) => {
  const { notes } = req.body;
  try {
    const title = await generateTitle(notes);
    res.json({ title });
    console.log(
      "TIIIIIIIIITTTTTTLLLLLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE HERE",
      title
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
