import { createTCPConnection } from './sqlConnect.js';

export async function getOrSetUserMessage(userMessage) {
    const connection = await createTCPConnection();
    try {
        const [results] = await connection.query(`SELECT id FROM user_messages WHERE content = ?`, [userMessage]);

        if (results.length === 0) {
            const [insertResult] = await connection.query(
                `INSERT INTO user_messages (content) VALUES (?)`,
                [userMessage]
            );
            return insertResult.insertId;
        } else {
            return results[0].id;
        }
    } catch (err) {
        console.log(`Error in getOrSetUserMessage: ${err}`);
        return false;
    } finally {
        connection.end();
    }
}


export async function getOrSetSystemMessage(systemMessage) {
    const connection = await createTCPConnection();

    try {
        const [results] = await connection.query(`SELECT id FROM system_messages WHERE content = ?`, [systemMessage]);

        if (results.length === 0) {
            const [insertResult] = await connection.query(
                `INSERT INTO system_messages (content) VALUES (?)`,
                [systemMessage]
            );
            return insertResult.insertId;
        } else {
            return results[0].id;
        }
    } catch (err) {
        console.log(`Error in getOrSetSystemMessage: ${err}`);
        return false;
    } finally {
        connection.end();
    }
}
