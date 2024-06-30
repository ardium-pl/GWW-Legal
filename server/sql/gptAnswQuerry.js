import { createTCPConnection } from './sqlConnect.js';

export async function getGptResponse(courtRulingID, systemMessageID, userMessageID) {
    const connection = await createTCPConnection();
    const query = `SELECT answer
                   FROM gpt_queries
                   WHERE ruling_id = ?
                   AND system_message_id = ?
                   AND user_message_id = ?`;

    const [rows] = await connection.execute(query, [courtRulingID, systemMessageID, userMessageID]);
    return rows.length > 0 ? rows[0].answer : null;
}

export async function setGptResponse(courtRulingID, systemMessageID, userMessageID, response) {
    const connection = await createTCPConnection();
    const query = `
        INSERT INTO gpt_queries (ruling_id, system_message_id, user_message_id, answer)
        VALUES (?, ?, ?, ?)`;

    const [result] = await connection.execute(query, [courtRulingID, systemMessageID, userMessageID, response]);

    if (result.affectedRows === 0) {
        throw new Error("An error occurred while saving");
    }

    return true;
}
