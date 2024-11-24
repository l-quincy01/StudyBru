const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const pptx2json = require("pptx2json");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const pptx2jsonInstance = new pptx2json();

app.post("/parse-pdf", upload.single("file"), async (req, res) => {
  try {
    console.log("Received a PDF file");
    const dataBuffer = req.file.buffer;
    const data = await pdfParse(dataBuffer);
    res.json({ text: data.text });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).send(error.toString());
  }
});

app.post("/parse-docx", upload.single("file"), async (req, res) => {
  try {
    console.log("Received a DOCX file");
    const docxBuffer = req.file.buffer;
    const result = await mammoth.extractRawText({ buffer: docxBuffer });
    res.json({ text: result.value });
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    res.status(500).send(error.toString());
  }
});

app.post("/parse-pptx", upload.single("file"), async (req, res) => {
  try {
    console.log("Received a PPTX file");
    const pptxBuffer = req.file.buffer;

    const result = await pptx2jsonInstance.parse(pptxBuffer);

    res.json({ text: result });
  } catch (error) {
    console.error("Error parsing PPTX:", error);
    res.status(500).send(error.toString());
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
