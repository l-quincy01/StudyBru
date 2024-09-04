import React, { createContext, useState } from "react";

// Create a Context for the quiz
export const TermsContext = createContext();

export const TermsProvider = ({ children }) => {
  const [termsContext, setTermsContext] = useState([]);

  return (
    <TermsContext.Provider value={{ termsContext, setTermsContext }}>
      {children}
    </TermsContext.Provider>
  );
};
