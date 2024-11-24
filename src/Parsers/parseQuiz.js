/**
 *
 * @param
 * @returns
 */
const parseQuiz = (inputString) => {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const questionBlocks = inputString.match(/\{[^}]+\}/g);
  const result = [];
  questionBlocks.forEach((block) => {
    const question = block.match(/question: "(.*?)"/)[1];
    const options = block
      .match(/options: \[(.*?)\]/)[1]
      .split('", "')
      .map((option) => option.replace(/^"|"$/g, ""));
    const correctAnswer = block.match(/correctAnswer: "(.*?)"/)[1];
    result.push({ question, options, correctAnswer });
  });
  return result;
};

export default parseQuiz;
