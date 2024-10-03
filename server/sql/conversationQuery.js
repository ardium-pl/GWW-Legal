import { createTCPConnection } from './sqlConnect.js';

export async function getConversationHistory(gptQueryId) {
  const connection = await createTCPConnection();
  try {
    const query = `SELECT message, answer
        FROM conversations
        WHERE gpt_query_id = ? 
        ORDER BY id ASC;
        `;

    const [result] = await connection.query(query, [gptQueryId]);

    return result.length === 0 ? null : result;
  } finally {
    connection.end();
  }
}

export async function storeConversation(message, chatResponse, gptQueryId) {
  const connection = await createTCPConnection();
  try {
    const query = `INSERT INTO conversations (message, answer, gpt_query_id) 
                       VALUES (?, ?, ?);`;

    const [insertResult] = await connection.query(query, [message, chatResponse, gptQueryId]);
    return insertResult.insertId;
  } finally {
    connection.end();
  }
}
