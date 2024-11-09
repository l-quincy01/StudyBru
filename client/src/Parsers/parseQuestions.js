/**
 *
 * @param
 * @returns
 */
const parseQuestions = (inputString) => {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const questionsBlock = inputString.match(/\{[^}]+\}/g);
  const result = [];
  questionsBlock.forEach((block) => {
    const questionMatch = block.match(/question: "(.*?)"/);
    const answerMatch = block.match(/answer: "(.*?)"/);
    const markAllocationMatch = block.match(/markAllocation: "(.*?)"/);
    if (questionMatch && answerMatch) {
      result.push({
        question: questionMatch[1],
        answer: answerMatch[1],
        markAllocation: markAllocationMatch[1],
      });
    }
  });
  return result;
};

export default parseQuestions;
