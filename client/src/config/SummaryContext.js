// Create a Context for MagicNotes
import React, { createContext, useState } from "react";

// Create a Context for the magic notes
export const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
  const [summary, setSummary] = useState([]);

  return (
    <SummaryContext.Provider value={{ summary, setSummary }}>
      {children}
    </SummaryContext.Provider>
  );
};
