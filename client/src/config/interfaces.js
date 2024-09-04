export const Role = {
  User: 0,
  Bot: 1,
};

/**
 * @typedef {Object} Message
 * @property {number} role - The role of the message sender (0 for User, 1 for Bot).
 * @property {string} content - The content of the message.
 * @property {string} [imageUrl] - The URL of the image associated with the message (optional).
 * @property {string} [prompt] - The prompt text (optional).
 */

/**
 * @typedef {Object} Chat
 * @property {number} id - The unique identifier for the chat.
 * @property {string} title - The title of the chat.
 */
