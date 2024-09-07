import { createTCPConnection } from './sqlConnect.js';

let hasAnyMessages = false;
const userMessagesCache = {};

export async function insertUserMessage(userMessage, shortMessage) {
  const connection = await createTCPConnection();
  try {
    const [insertResult] = await connection.query(`INSERT INTO user_messages (content, short_content) VALUES (?, ?)`, [
      userMessage,
      shortMessage,
    ]);
    userMessagesCache[insertResult.insertId] = {
      id: insertResult.insertId,
      shortMessage: shortMessage,
      message: userMessage,
    };
    return insertResult.insertId;
  } finally {
    connection.end();
  }
}

export async function updateUserMessage(msgId, userMessage, shortMessage) {
  const connection = await createTCPConnection();
  try {
    await connection.query(`UPDATE user_messages SET content = ?, short_content = ? WHERE id = ?;`, [
      userMessage,
      shortMessage,
      msgId,
    ]);
    userMessagesCache[msgId] = { id: msgId, shortMessage: shortMessage, message: userMessage };
    return insertResult.insertId;
  } finally {
    connection.end();
  }
}

export async function getUserMessage(id) {
  if (userMessagesCache[id]) return userMessagesCache[id].message;

  const connection = await createTCPConnection();
  let results;
  try {
    [results] = await connection.query(
      `SELECT short_content as shortMessage, content as message FROM user_messages WHERE id = ?`,
      [id]
    );
  } finally {
    connection.end();
  }

  if (results.length === 0) throw new Error(`Cannot find user message with id ${id}.`);
  const { shortMessage, message } = results[0];

  userMessagesCache[id] = { id, shortMessage, message };

  return message;
}

export async function getUserMessages() {
  if (hasAnyMessages) return Object.values(userMessagesCache);

  const connection = await createTCPConnection();
  try {
    const [results] = await connection.query(
      `SELECT id, short_content as shortMessage, content as message FROM user_messages`
    );

    for (const messageData of results) {
      userMessagesCache[messageData.id] = messageData;
    }
    hasAnyMessages = true;

    return results;
  } finally {
    connection.end();
  }
}

export async function getSystemMessageId(systemMessage) {
  if (systemMessage === '$DEFAULT$') {
    return 1;
  }

  const connection = await createTCPConnection();
  try {
    const [results] = await connection.query(`SELECT id FROM system_messages WHERE content = ?`, [systemMessage]);
    return results.length > 0 ? results[0].id : null;
  } finally {
    connection.end();
  }
}

export async function insertSystemMessage(systemMessage) {
  const connection = await createTCPConnection();
  try {
    const [insertResult] = await connection.query(`INSERT INTO system_messages (content) VALUES (?)`, [systemMessage]);
    return insertResult.insertId;
  } finally {
    connection.end();
  }
}
