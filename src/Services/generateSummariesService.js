import axios from "axios";
//helper
const removeTriplebackticks = (text) => {
  return text.replace(/```/g, "");
};

const generateSummariesService = async (notes, setSummary) => {
  try {
    const response = await axios.post(
      "http://192.168.68.100:3004/generate-summary",
      { notes: notes },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setSummary(removeTriplebackticks(response.data.summary));
  } catch (error) {
    console.error("Error generating summary:", error);
  }
};

export default generateSummariesService;
