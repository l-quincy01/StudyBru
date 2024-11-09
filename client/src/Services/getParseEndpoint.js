/**
 *
 * @param
 * @returns
 */
const getParseEndpoint = (mimeType) => {
  switch (mimeType) {
    case "application/pdf":
      return "http://172.20.10.7:3001/parse-pdf";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "http://172.20.10.7:3001/parse-docx";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "http://172.20.10.7:3001/parse-pptx";
    default:
      throw new Error("Unsupported file type");
  }
};

export default getParseEndpoint;
