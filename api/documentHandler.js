const DocumentPicker = require("expo-document-picker");
const { PDFDocument } = require("pdf-lib");

const documentHandler = async (setNotes) => {
  let result = await DocumentPicker.getDocumentAsync({});
  if (result.type === "success") {
    const response = await fetch(result.uri);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    if (result.name.endsWith(".pdf")) {
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      let text = "";
      for (const page of pages) {
        text += page
          .getTextContent()
          .items.map((item) => item.str)
          .join(" ");
      }
      setNotes(text);
    } else {
      const text = await response.text();
      setNotes(text);
    }
  }
};

module.exports = {
  documentHandler,
};
