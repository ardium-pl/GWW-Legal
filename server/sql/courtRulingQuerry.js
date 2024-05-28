import { createTCPConnection } from './sqlConnect.js';

export async function getOrSetCourtRuling(caseSignature = null, caseContent = null) {
    const connection = await createTCPConnection();

    try {
        if (caseContent && !caseSignature) {
            const [result] = await connection.query(`SELECT signature FROM rulings WHERE ruling = ?`, [caseContent]);
            if (result.length > 0) {
                caseSignature = result[0].signature;
            } else {
                return false;
            }
        }

        if (!caseSignature) {
            return false;
        }

        const [results] = await connection.query(`SELECT * FROM rulings WHERE signature = ?`, [caseSignature]);

        if (results.length === 0) {
            if (caseContent) {
                await connection.query(
                    `INSERT INTO rulings (signature, ruling) VALUES (?, ?)`,
                    [caseSignature, caseContent]
                );
            }
            return false;
        } else {
            if (caseContent) {
                await connection.query(
                    `UPDATE rulings SET ruling = ? WHERE signature = ?`,
                    [caseContent, caseSignature]
                );
            }
            return results[0].ruling;
        }
    } catch (err) {
        console.log(`Error in getOrSetCourtRuling: ${err}`);
        return false;
    } finally {
        connection.end();
    }
}


export async function getCourtRulingID(caseSignature) {
    const connection = await createTCPConnection();
    const [results] = await connection.query(`SELECT id FROM rulings WHERE signature = ?`, [caseSignature]);
    if (results.length != 0) {
        return results[0].id;
    }
    return false;
}