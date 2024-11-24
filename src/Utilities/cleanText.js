/**
 * Removes excess whitespace from a given string.
 * @param {string} text - The text to clean.
 * @returns {string} - Cleaned text with single spaces between words.
 */
const cleanText = (text) => {
  return text.replace(/\s+/g, " ");
};

export default cleanText;
