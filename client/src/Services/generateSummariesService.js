import axios from "axios";

const generateSummariesService = async (
  notes,
  setSummary,
  removeTriplebackticks
) => {
  try {
    const response = await axios.post(
      "http://172.20.10.7:3004/generate-summary",
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
