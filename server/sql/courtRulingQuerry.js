import {createTCPConnection} from './sqlConnect.js';

export async function insertRuling(caseSignature, caseContent) {
    const connection = await createTCPConnection();
    const [insertResult] = await connection.query(`INSERT INTO rulings (signature, ruling)
                                                   VALUES (?, ?)`, [caseSignature, caseContent]);
    return insertResult.insertId;
}

export async function getPaginatedSignatures(page, pageSize) {
    const offset = (page - 1) * pageSize;
    const query = `
    SELECT signature
    FROM rulings
    ORDER BY id
    LIMIT ${pageSize} OFFSET ${offset}
  `;

    let connection;
    try {
        connection = await createTCPConnection();
        const [rows] = await connection.query(query);
        return rows.map(row => row.signature);
    } catch (error) {
        console.error('Error in getPaginatedSignatures:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// export async function getPaginatedSignatures(page, pageSize) {
//     const offset = (page - 1) * pageSize;
//     const query = `
//         SELECT signature
//         FROM rulings
//         ORDER BY id
//             LIMIT ? OFFSET ?
//     `;
//
//     let connection;
//     try {
//         connection = await createTCPConnection();
//         // Convert pageSize and offset to numbers explicitly
//         const [rows] = await connection.execute(query, [Number(pageSize), Number(offset)]);
//         return rows.map(row => row.signature);
//     } catch (error) {
//         console.error('Error in getPaginatedSignatures:', error);
//         throw error;
//     } finally {
//         if (connection) {
//             await connection.end();
//         }
//     }
// }


export async function getDetailedRulingInfo(signature) {
    const query = `
        SELECT r.signature,
               r.ruling,
               GROUP_CONCAT(DISTINCT gq.user_message_id) AS user_message_ids,
               GROUP_CONCAT(DISTINCT gq.answer)          AS gpt_answers
        FROM rulings r
                 LEFT JOIN gpt_queries gq ON r.id = gq.ruling_id
        WHERE r.signature = ?
        GROUP BY r.id
    `;

    const connection = await createTCPConnection();
    try {
        const [rows] = await connection.execute(query, [signature]);

        if (rows.length === 0) {
            return null;
        }

        const row = rows[0];
        return {
            signature: row.signature,
            ruling: row.ruling,
            gptQueries: row.user_message_ids ? row.user_message_ids.split(',').map((id, index) => ({
                userMessageId: parseInt(id),
                answer: row.gpt_answers.split(',')[index]
            })) : []
        };
    } finally {
        await connection.end();
    }
}


export async function getCourtRulingID(signature) {
    const connection = await createTCPConnection();
    try {
        const [rows] = await connection.execute('SELECT id FROM rulings WHERE signature = ?', [signature]);
        return rows.length > 0 ? rows[0].id : null;
    } finally {
        await connection.end();
    }
}

export async function getRulingBySignature(signature) {
    const connection = await createTCPConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM rulings WHERE signature = ?', [signature]);
        return rows.length > 0 ? rows[0] : null;
    } finally {
        await connection.end();
    }
}
