export async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;
  let dbResult = await db.getFirstAsync("PRAGMA user_version");
  let currentDbVersion = dbResult.user_version;

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log("ON LATEST DB");
    return;
  }

  if (currentDbVersion === 0) {
    const result = await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE chats (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL 
      );
      
      CREATE TABLE messages (
        id INTEGER PRIMARY KEY NOT NULL, 
        chat_id INTEGER NOT NULL, 
        content TEXT NOT NULL, 
        role TEXT, 
        prompt TEXT, 
        FOREIGN KEY (chat_id) REFERENCES chats (id) ON DELETE CASCADE
      );
    `);

    console.log(result);
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export const addChat = async (db, title) => {
  return await db.runAsync("INSERT INTO chats (title) VALUES (?)", title);
};

export const getChats = async (db) => {
  return await db.getAllAsync("SELECT * FROM chats");
};

export const getMessages = async (db, chatId) => {
  return (
    await db.getAllAsync("SELECT * FROM messages WHERE chat_id = ?", chatId)
  ).map((message) => ({
    ...message,
    role: message.role === "bot" ? "Bot" : "User",
  }));
};

export const addMessage = async (
  db,
  chatId,
  { content, role, imageUrl, prompt }
) => {
  return await db.runAsync(
    "INSERT INTO messages (chat_id, content, role, imageUrl, prompt) VALUES (?, ?, ?, ?, ?)",
    chatId,
    content,
    role === "Bot" ? "bot" : "user",
    imageUrl || "",
    prompt || ""
  );
};

export const deleteChat = async (db, chatId) => {
  return await db.runAsync("DELETE FROM chats WHERE id = ?", chatId);
};

export const renameChat = async (db, chatId, title) => {
  return await db.runAsync(
    "UPDATE chats SET title = ? WHERE id = ?",
    title,
    chatId
  );
};
