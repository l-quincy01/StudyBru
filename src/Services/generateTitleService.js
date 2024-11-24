import axios from "axios";

const generateTitleService = async (notes, setNotesTitle) => {
  try {
    const response = await axios.post(
      "http://192.168.68.100:3006/generate-title",
      { notes: notes },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setNotesTitle(response.data.title);
  } catch (error) {
    console.error("Error generating title:", error);
  }
};

export default generateTitleService;
