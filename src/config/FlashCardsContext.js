// Create a Context for MagicNotes
import React, { createContext, useState } from "react";

// Create a Context for the magic notes
export const FlashCardsContext = createContext();

export const FlashCardsProvider = ({ children }) => {
  const [flashCards, setFlashCards] = useState([]);

  return (
    <FlashCardsContext.Provider value={{ flashCards, setFlashCards }}>
      {children}
    </FlashCardsContext.Provider>
  );
};
