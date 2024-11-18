/**
 *
 * @param
 * @returns
 */

import axios from "axios";

const documentUploadService = async (file, getParseEndpoint, cleanText) => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.assets[0].uri,
    type: file.assets[0].mimeType,
    name: file.assets[0].name,
  });

  try {
    const parseEndpoint = getParseEndpoint(file.assets[0].mimeType);
    const parseResponse = await axios.post(parseEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const parsedText = cleanText(parseResponse.data.text);

    setNotes(parsedText);
  } catch (error) {
    console.error("Error processing file:", error);
  }
};

export default documentUploadService;
