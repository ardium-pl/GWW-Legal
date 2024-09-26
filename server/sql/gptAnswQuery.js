import { createTCPConnection } from './sqlConnect.js';
import { getUserMessageId } from './messagesQuery.js';
import { getCourtRulingByContent } from './courtRulingQuery.js';

export async function getGptResponse(courtRulingId, systemMessageId, userMessageId) {
  const connection = await createTCPConnection();
  const query = `SELECT answer
                   FROM gpt_queries
                   WHERE ruling_id = ?
                   AND system_message_id = ?
                   AND user_message_id = ?`;

  try {
    const [rows] = await connection.execute(query, [courtRulingId, systemMessageId, userMessageId]);
    return rows.length > 0 ? rows[0].answer : null;
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
  } finally {
    await connection.end();
  }

  if (result.affectedRows === 0) {
    throw new Error('An error occurred while saving');
  }
  return true;
}

export async function getGptQueryId(gptAnswer, userMessage, caseContent) {
  
  const userMessageId = await getUserMessageId(userMessage);
  const courtRulingId = await getCourtRulingByContent(caseContent); // Error here!

  if (!userMessageId || !courtRulingId) {
    console.log('some null');
    console.log('userMessageId: ' + userMessageId);
    console.log('courtRulingId: ' + courtRulingId);

    return null;
  }

  const connection = await createTCPConnection();
  try {
    const query = `SELECT id
          FROM gpt_queries
          WHERE answer = ?
          AND user_message_id = ?
          AND ruling_id = ?
          `;

    const [results] = await connection.query(query, [gptAnswer, userMessageId, courtRulingId]);
    return results.length > 0 ? results[0].id : null;
  } finally {
    connection.end();
  }
}

