import { createTCPConnection } from './sqlConnect.js';

export async function getGptResponse(courtRulingId, systemMessageId, userMessageId) {
  const connection = await createTCPConnection();
  const query = `SELECT answer, id
                   FROM gpt_queries
                   WHERE ruling_id = ?
                   AND system_message_id = ?
                   AND user_message_id = ?`;

  try {
    const [rows] = await connection.execute(query, [courtRulingId, systemMessageId, userMessageId]);
    return rows.length > 0 ? rows[0] : null;
  } finally {
    await connection.end();
  }
}

export async function setGptResponse(courtRulingId, systemMessageId, userMessageId, response) {
  const connection = await createTCPConnection();
  const query = `
        INSERT INTO gpt_queries (ruling_id, system_message_id, user_message_id, answer)
        VALUES (?, ?, ?, ?)`;

  let result;
  try {
    [result] = await connection.execute(query, [courtRulingId, systemMessageId, userMessageId, response]);
    return result.insertId;
  } finally {
    await connection.end();
  }
}