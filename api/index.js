const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json()); // Needed to parse JSON request bodies

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fileSchema = new mongoose.Schema({
  filePath: String,
  title: String,
  subjectTitle: { String, default: "General" },
  setsTitle: { String, default: "General" },
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/uploadNotes", upload.single("file"), async (req, res) => {
  try {
    const newFile = new File({ filePath: `/uploads/${req.file.filename}` });
    const savedFile = await newFile.save();
    res.status(200).json({
      message: "File uploaded successfully",
      fileId: savedFile._id,
      filePath: savedFile.filePath,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.post("/uploadNotes", upload.single("file"), async (req, res) => {
  try {
    const { title, subjectTitle, setsTitle } = req.body;
    const newFile = new File({
      filePath: `/uploads/${req.file.filename}`,
      title, // Optional: you can include these fields here if provided in the request
      subjectTitle,
      setsTitle,
    });
    const savedFile = await newFile.save();
    res.status(200).json({
      message: "File uploaded successfully",
      fileId: savedFile._id,
      filePath: savedFile.filePath,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.post("/uploadTitle", async (req, res) => {
  try {
    const { fileId, title, subjectTitle, setsTitle } = req.body;

    // Find the file by ID and update it with the provided titles
    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { title, subjectTitle, setsTitle },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json({
      message: "Titles uploaded successfully",
      updatedFile,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading titles" });
  }
});

app.get("/notes/:title", async (req, res) => {
  try {
    const { title } = req.params;

    // Find the file by title
    const file = await File.findOne({ title });

    if (!file) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({
      message: "Note fetched successfully",
      content: file.filePath,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching note" });
  }
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(4001, () => {
  console.log("Server started on http://localhost:4001");
});
