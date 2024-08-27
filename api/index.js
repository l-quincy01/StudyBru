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
      fileId: savedFile._id, // Return the file ID for later use
      filePath: savedFile.filePath,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.post("/uploadTitle", async (req, res) => {
  try {
    const { fileId, title } = req.body;

    // Find the file by ID and update it with the title
    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { title: title },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).json({
      message: "Title uploaded successfully",
      updatedFile,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading title" });
  }
});

app.get("/user-notes", async (req, res) => {
  res.json(await File.find());
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(4001, () => {
  console.log("Server started on http://localhost:4001");
});
