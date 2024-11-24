import React, { createContext, useState } from "react";

// Create a Context for the quiz
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState([]);

  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
