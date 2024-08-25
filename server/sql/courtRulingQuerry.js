import { createTCPConnection } from './sqlConnect.js';

export async function getRulingBySignature(caseSignature) {
    const connection = await createTCPConnection();
    const [results] = await connection.query(`SELECT * FROM rulings WHERE signature = ?`, [caseSignature]);
    return results.length > 0 ? results[0].ruling : null;
}

export async function insertRuling(caseSignature, caseContent, classification) {
    const connection = await createTCPConnection();
    const [insertResult] = await connection.query(`INSERT INTO rulings (signature, ruling, solved) VALUES (?, ?, ?)`, [caseSignature, caseContent, classification]);
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