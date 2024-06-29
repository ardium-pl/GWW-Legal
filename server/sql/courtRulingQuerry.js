import { createTCPConnection } from './sqlConnect.js';

export async function getSignatureByContent(caseContent) {
    const connection = await createTCPConnection();
    const [result] = await connection.query(`SELECT signature FROM rulings WHERE ruling = ?`, [caseContent]);
    return result.length > 0 ? result[0].signature : null;
}

export async function getRulingBySignature(caseSignature) {
    const connection = await createTCPConnection();
    const [results] = await connection.query(`SELECT * FROM rulings WHERE signature = ?`, [caseSignature]);
    return results.length > 0 ? results[0].ruling : null;
}

export async function insertRuling(caseSignature, caseContent) {
    const connection = await createTCPConnection();
    await connection.query(`INSERT INTO rulings (signature, ruling) VALUES (?, ?)`, [caseSignature, caseContent]);
}

export async function getCourtRulingID(caseSignature) {
    const connection = await createTCPConnection();
    const [results] = await connection.query(`SELECT id FROM rulings WHERE signature = ?`, [caseSignature]);
    if (results.length != 0) {
        return results[0].id;
    }
    return false;
}