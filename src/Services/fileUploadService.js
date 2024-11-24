import axios from "axios";

const fileUploadService = async (file, notesTitle, subjectTitle, setsTitle) => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.assets[0].uri,
    type: file.assets[0].mimeType,
    name: file.assets[0].name,
  });

  try {
    const uploadResponse = await axios.post(
      "http://192.168.68.100:4001/uploadNotesFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { fileId } = uploadResponse.data;

    if (fileId) {
      console.log("Heres the file ID", fileId);
    }

    const uploadTitleResponse = await axios.post(
      "http://192.168.68.100:4001/uploadNoteDetails",
      {
        fileId,
        title: notesTitle,
        subjectTitle: subjectTitle,
        setsTitle: setsTitle, // Pass the selected setsTitle
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("File uploaded successfully:", uploadResponse.data);
    console.log("Title uploaded successfully:", uploadTitleResponse.data);
  } catch (uploadError) {
    console.error(
      "Error uploading file:",
      uploadError,
      notesTitle,
      subjectTitle,
      setsTitle
    );
  }
};

export default fileUploadService;
