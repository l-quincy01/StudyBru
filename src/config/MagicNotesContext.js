// Create a Context for MagicNotes
import React, { createContext, useState } from "react";

// Create a Context for the magic notes
export const MagicNotesContext = createContext();

export const MagicNotesProvider = ({ children }) => {
  const [magicNotes, setMagicNotes] = useState([]);

  return (
    <MagicNotesContext.Provider value={{ magicNotes, setMagicNotes }}>
      {children}
    </MagicNotesContext.Provider>
  );
};
