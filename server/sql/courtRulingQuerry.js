import { createTCPConnection } from './sqlConnect.js';

export async function insertRuling(
    caseSignature,
    caseContent,
    classification,
    summary,
    procedureStartDate,
    dateOfLimitationsOnTaxLiability,
    nsaAmendment
  ) {
    const connection = await createTCPConnection();
  
    const [insertResult] = await connection.query(
      `INSERT INTO rulings (signature, ruling, solved, summary, procedure_start_date, limitation_date, is_related_to_nsa_2021) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [caseSignature, caseContent, classification, summary, procedureStartDate, dateOfLimitationsOnTaxLiability, nsaAmendment]
    );
    return insertResult.insertId;
  }

export async function getPaginatedSignatures(page, pageSize) {
  const offset = (page - 1) * pageSize;
  const query = `
    SELECT
      signature,
      solved,
      summary,
      procedure_start_date as procedureStartDate,
      limitation_date as limitationDate,
      is_related_to_nsa_2021 as isRelated
    FROM rulings
    ORDER BY id
    LIMIT ${pageSize} OFFSET ${offset}
  `;
  const totalQuery = `SELECT COUNT(*) AS amount FROM rulings;`;

  let connection;
  try {
    connection = await createTCPConnection();
    const [rows] = await connection.query(query);
    const [total] = await connection.query(totalQuery);
    return {
      data: rows.map(v => ({
        ...v,
        solved: v.solved === -1 ? null : v.solved === 1,
        isRelated: v.isRelated === null ? null : v.isRelated === 1,
      })),
      total: total[0].amount,
    };
  } catch (error) {
    console.error('Error in getPaginatedSignatures:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

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
      return { systemMessage: null, userMessageIds: null };
    }

    const systemMessageId = rows[0].system_message_id;
    const systemMessage = await _getSystemMessageById(systemMessageId);
    const filteredRows = rows.filter(v => v.system_message_id === systemMessageId);

    return {
      systemMessage,
      userMessageIds: filteredRows.map(v => v.user_message_id),
    };
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

export async function getCourtRulingId(signature) {
  if (signature === '!') return 1;
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
