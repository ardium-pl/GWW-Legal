import { createTCPConnection } from './sqlConnect.js';

export async function insertRuling(caseSignature, caseContent) {
  const connection = await createTCPConnection();
  const [insertResult] = await connection.query(
    `INSERT INTO rulings (signature, ruling)
     VALUES (?, ?)`,
    [caseSignature, caseContent]
  );
  return insertResult.insertId;
}

export async function getPaginatedSignatures(page, pageSize) {
  const offset = (page - 1) * pageSize;
  const query = `
    SELECT signature, solved, summary
    FROM rulings
    ORDER BY id
    LIMIT ${pageSize} OFFSET ${offset}
  `;

  let connection;
  try {
    connection = await createTCPConnection();
    const [rows] = await connection.query(query);
    return rows.map(v => ({ ...v, solved: v === null ? null : v === 1 }));
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
  SELECT gq.system_message_id, gq.user_message_id
  FROM gpt_queries gq
  JOIN rulings r ON gq.ruling_id = r.id
  WHERE r.signature = ?
  ORDER BY gq.system_message_id ASC, gq.user_message_id ASC;`;

  const connection = await createTCPConnection();
  try {
    const [rows] = await connection.execute(query, [signature]);

    if (rows.length === 0) {
      return null;
    }

    const filteredRows = rows
      .filter(v => v.system_message_id === rows[0].system_message_id)
      .map(v => ({ um: v.user_message_id, answer: v.answer }));

    const systemMessage = await _getSystemMessageById(rows[0].system_message_id);

    const userMessageIds = filteredRows.map(v => v.um);
    const userMessages = await _getUserMessagesById(userMessageIds);

    const independentMessages = userMessages.splice(3, userMessages.length);

    return { systemMessage, mainMessages: userMessages, independentMessages };
  } finally {
    await connection.end();
  }
}

async function _getSystemMessageById(id) {
  const connection = await createTCPConnection();
  try {
    return (await connection.execute(`SELECT content FROM system_messages WHERE id = ? LIMIT 1;`, [id]))?.[0]?.[0]
      ?.content;
  } finally {
    await connection.end();
  }
}
async function _getUserMessagesById(ids) {
  const connection = await createTCPConnection();
  const results = [];
  for (const id of ids) {
    const message = (
      await connection.execute(`SELECT content FROM user_messages WHERE id = ? LIMIT 1;`, [id])
    )?.[0]?.[0]?.content;
    results.push(message);
  }
  await connection.end();
  return results;
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
    const [rows] = await connection.execute('SELECT ruling FROM rulings WHERE signature = ? LIMIT 1', [signature]);
    return rows.length > 0 ? rows[0].ruling : null;
  } finally {
    await connection.end();
  }
}
