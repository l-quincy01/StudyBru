/**
 * Removes excess whitespace from a given string.
 * @param {string} text - The text to clean.
 * @returns {string} - Cleaned text with single spaces between words.
 */
const removeTriplebackticks = (text) => {
  return text.replace(/```/g, "");
};

export default removeTriplebackticks;
