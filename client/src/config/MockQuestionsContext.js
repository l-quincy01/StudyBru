import React, { createContext, useState } from "react";

// Create a Context for the quiz
export const MockQuestionsContext = createContext();

export const MockQuestionsProvider = ({ children }) => {
  const [mockQuestionsContext, setMockQuestionsContext] = useState([]);

  return (
    <MockQuestionsContext.Provider
      value={{ mockQuestionsContext, setMockQuestionsContext }}
    >
      {children}
    </MockQuestionsContext.Provider>
  );
};
