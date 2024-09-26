import { createTCPConnection } from './sqlConnect.js';

export async function getRulingBySignature(caseSignature) {
  const connection = await createTCPConnection();
  const [results] = await connection.query(`SELECT * FROM rulings WHERE signature = ?`, [caseSignature]);
  return results.length > 0 ? results[0].ruling : null;
}

export async function insertRuling(
  caseSignature,
  caseContent,
  classification,
  summary,
  dateOfSuspension,
  dateOfLimitationsOnTaxLiability
) {
  const connection = await createTCPConnection();
  const [insertResult] = await connection.query(
    `INSERT INTO rulings (signature, ruling, solved, summary, date_of_suspension, date_of_limitation) VALUES (?, ?, ?, ?, ?, ?)`,
    [caseSignature, caseContent, classification, summary, dateOfSuspension, dateOfLimitationsOnTaxLiability]
  );
  return insertResult.insertId;
}

export async function getCourtRulingID(caseSignature) {
  const connection = await createTCPConnection();
  const [results] = await connection.query(`SELECT id FROM rulings WHERE signature = ?`, [caseSignature]);
  if (results.length != 0) {
    return results[0].id;
  }
  return null;
}
