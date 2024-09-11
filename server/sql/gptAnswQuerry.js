import { createTCPConnection } from './sqlConnect.js';

export async function getGptResponse(courtRulingId, systemMessageId, userMessageId) {
    const connection = await createTCPConnection();
    const query = `SELECT answer
                   FROM gpt_queries
                   WHERE ruling_id = ?
                   AND system_message_id = ?
                   AND user_message_id = ?`;

    const [rows] = await connection.execute(query, [courtRulingId, systemMessageId, userMessageId]);
    return rows.length > 0 ? rows[0].answer : null;
}

export async function setGptResponse(courtRulingId, systemMessageId, userMessageId, response) {
    const connection = await createTCPConnection();
    const query = `
        INSERT INTO gpt_queries (ruling_id, system_message_id, user_message_id, answer)
        VALUES (?, ?, ?, ?)`;

    const [result] = await connection.execute(query, [courtRulingId, systemMessageId, userMessageId, response]);

    if (result.affectedRows === 0) {
        throw new Error("An error occurred while saving");
    }

    return true;
}
