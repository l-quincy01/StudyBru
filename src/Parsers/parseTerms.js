/**
 *
 * @param
 * @returns
 */
const parseTerms = (inputString) => {
  inputString = inputString.replace(/\n/g, "").replace(/\s+/g, " ");
  const termsBlocks = inputString.match(/\{[^}]+\}/g);
  const result = [];
  termsBlocks.forEach((block) => {
    const termMatch = block.match(/term: "(.*?)"/);
    const definitionMatch = block.match(/definition: "(.*?)"/);
    if (termMatch && definitionMatch) {
      result.push({ term: termMatch[1], definition: definitionMatch[1] });
    }
  });
  return result;
};

export default parseTerms;
