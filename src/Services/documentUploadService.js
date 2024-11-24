/**
 *
 * @param
 * @returns
 */

import axios from "axios";

// function getParseEndpoint(mimeType) {
//   switch (mimeType) {
//     case "application/pdf":
//       return "http://192.168.68.100:3001/parse-pdf";
//     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//       return "http://192.168.68.100:3001/parse-docx";
//     case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
//       return "http://192.168.68.100:3001/parse-pptx";
//     default:
//       throw new Error("Unsupported file type");
//   }
// }

//helper
const cleanText = (text) => {
  return text.replace(/\s+/g, " ");
};

const documentUploadService = async (file, setNotes) => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.assets[0].uri,
    type: file.assets[0].mimeType,
    name: file.assets[0].name,
  });

  try {
    //console.log("Start Try ");
    //const parseEndpoint = getParseEndpoint(file.assets[0].mimeType);

    const parseResponse = await axios.post(
      "http://192.168.68.100:3001/parse-pdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const parsedText = cleanText(parseResponse.data.text);

    setNotes(parsedText);
  } catch (error) {
    console.error("Error processing file:", error);
  }
};

export default documentUploadService;
