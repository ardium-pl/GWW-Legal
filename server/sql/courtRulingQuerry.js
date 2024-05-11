import { createTCPConnection } from './sqlConnect.js';

export async function getCourtRoulingFromDB(caseSignature){
    const connection = await createTCPConnection();

    try {
        const [results, fields] = await connection.query(`SELECT * FROM rulings WHERE signature = ?`, [caseSignature]);

        if (results.length === 0) {
            return false; 
        } else {
            return results[0].ruling;
        }
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        await connection.end();
    }
}

export async function setCourtRuling(caseSignature, caseContent) {
    const connection = await createTCPConnection();

    try {
        const [results, fields] = await connection.query(`SELECT * FROM rulings WHERE signature = ?`, [caseSignature]);

        if (results.length === 0) {
            await connection.query(
                `INSERT INTO rulings (signature, ruling) VALUES (?, ?)`,
                [caseSignature, caseContent]
            );
        } else {
            await connection.query(
                `UPDATE rulings SET ruling = ? WHERE signature = ?`,
                [caseContent, caseSignature]
            );
        }
    } catch (err) {
        console.log(`Error while setting ruling: ${err}`);
    } finally {
        connection.end();
    }
}