import React, { createContext, useState } from "react";

// Create a Context for the quiz
export const MockQuestionsContext = createContext();

export const MockQuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  return (
    <MockQuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </MockQuestionsContext.Provider>
  );
};
