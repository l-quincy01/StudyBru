import React, { createContext, useState } from "react";

// Create a Context for the quiz
export const TermsContext = createContext();

export const TermsProvider = ({ children }) => {
  const [terms, setTerms] = useState([]);

  return (
    <TermsContext.Provider value={{ terms, setTerms }}>
      {children}
    </TermsContext.Provider>
  );
};
