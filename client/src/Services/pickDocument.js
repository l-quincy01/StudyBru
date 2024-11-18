import * as DocumentPicker from "expo-document-picker";

const pickDocument = async () => {
  console.log("Document picker opened");
  let result = await DocumentPicker.getDocumentAsync({});
  if (result.assets[0].uri) {
    console.log("Document picked successfully");
    setSelectedFile(result);
    await uploadDocument(result);
  } else {
    console.log("Document picker cancelled or failed");
  }
};

export default pickDocument;
