import { createTCPConnection } from './sqlConnect.js';

export async function getOrSetGptResponse(courtRulingID, systemMessageID, userMessageID, response = null) {
    const connection = await createTCPConnection();

    try {
        if (!response) {
            // Fetch the GPT answer from the database
            const query = `SELECT answer
                FROM gpt_queries
                WHERE ruling_id = ?
                AND system_message_id = ?
                AND user_message_id = ?`;

            const [rows] = await connection.execute(query, [courtRulingID, systemMessageID, userMessageID]);
            return rows.length > 0 ? rows[0].answer : false;
        } else {
            // Save the GPT response to the database
            const query = `
                INSERT INTO gpt_queries (ruling_id, system_message_id, user_message_id, answer)
                VALUES (?, ?, ?, ?)`;

            const [result] = await connection.execute(query, [courtRulingID, systemMessageID, userMessageID, response]);

            if (result.affectedRows === 0) {
                throw new Error("An error occurred while saving");
            }

            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        await connection.end();
    }
}
