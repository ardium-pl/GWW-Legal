import { createTCPConnection } from './sqlConnect.js';

export async function getConversationHistory(gptQueryId){
    const connection = await createTCPConnection();
    try{
        const query = `SELECT id, message, message_type
        FROM conversations
        WHERE gpt_query_id = ? 
        ORDER BY id ASC;
        `;

        const [result] = await connection.query(query, [gptQueryId]);

        return result.length === 0 ? null : result.map((res) => ({
            message: res.message,
            type: res.type
        }));

    }finally {
        connection.end();
    }
}

export async function storeConversation(message, messageType,gptQueryId) {
    const connection = await createTCPConnection();
    try {
        const query = `INSERT INTO conversations (message, message_type, gpt_query_id) 
                       VALUES (?, ?, ?);`;
    
        const [insertResult] =  await connection.query(query, [message, messageType, gptQueryId]);
        return insertResult.insertId;
    } finally {
        connection.end();
    }
}