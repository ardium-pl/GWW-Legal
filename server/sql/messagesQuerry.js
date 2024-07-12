import { createTCPConnection } from './sqlConnect.js';

export async function getUserMessageId(userMessage) {
    const connection = await createTCPConnection();
    const [results] = await connection.query(`SELECT id FROM user_messages WHERE content = ?`, [userMessage]);
    return results.length > 0 ? results[0].id : null;
}

export async function insertUserMessage(userMessage) {
    const connection = await createTCPConnection();
    const [insertResult] = await connection.query(`INSERT INTO user_messages (content) VALUES (?)`, [userMessage]);
    return insertResult.insertId;
}

export async function getSystemMessageId(systemMessage) {
    const connection = await createTCPConnection();
    const [results] = await connection.query(`SELECT id FROM system_messages WHERE content = ?`, [systemMessage]);
    return results.length > 0 ? results[0].id : null;
}

export async function insertSystemMessage(systemMessage) {
    const connection = await createTCPConnection();
    const [insertResult] = await connection.query(`INSERT INTO system_messages (content) VALUES (?)`, [systemMessage]);
    return insertResult.insertId;
}