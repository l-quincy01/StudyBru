const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fileSchema = new mongoose.Schema({
  filePath: String,
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

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
    const newFile = new File({ filePath: req.file.path });
    await newFile.save();
    res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(4001, () => {
  console.log("Server started on http://localhost:4001");
});

// try {
//     const uploadResponse = await axios.post(
//       "http://localhost:4001/uploadNotes",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log("File uploaded successfully:", uploadResponse.data);
//   } catch (uploadError) {
//     console.error("Error uploading file:", uploadError);
//   }
