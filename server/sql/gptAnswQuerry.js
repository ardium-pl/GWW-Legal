import { createTCPConnection } from './sqlConnect.js';

export async function getGptAnswFromDB(caseSignature, userMessage, systemMessage) {

    const connection = await createTCPConnection();

    try {
        const [rulingID, userMessageID, systemMesID] = await fetchIDs(caseSignature, userMessage, systemMessage);

        const query = `SELECT answer
        FROM gpt_queries
        WHERE ruling_id = ?
        AND system_message_id = ?
        AND user_message_id = ?
        `;

        const [rows] = await connection.execute(query, [rulingID, systemMesID, userMessageID]);    
        return rows.length > 0 ? rows[0].answer : false;

    } catch (err) {
        console.log(err)
    } finally {
        await connection.end();
    }
}

export async function saveGptResponseToDB(systemMessage, userMessage, caseSignature, response){

    const connection = await createTCPConnection();

    try {
        const [rulingID, userMessageID, systemMesID] = await fetchIDs(caseSignature, userMessage, systemMessage);

        const query = `
        INSERT INTO gpt_queries (ruling_id, system_message_id, user_message_id, answer)
        VALUES (?, ?, ?, ?)
      `;

        const [result] = await connection.execute(query, [rulingID, systemMesID, userMessageID, response]);
        
        if(result.affectedRows === 0){
            throw new error("An error occured while saving");
        }

    }catch (err) {
        console.log(err)
    } finally {
        await connection.end();
    }
}

export async function getCaseSignatureFromDbByText(caseContentText){
    const connection = await createTCPConnection();

    try{
        const [result, details] = await connection.query(`SELECT signature FROM rulings WHERE ruling = ?`, [caseContentText]);
        const caseSignature = result[0].signature;
        
        if(caseSignature){
            return caseSignature;
        }else{
            return false;
        }

    }catch (err) {
        console.log(err)
    } finally {
        await connection.end();
    }
}

async function fetchIDs(caseSignature, userMessage, systemMessage) {
    return await Promise.all([
        findIdByColumnValue('rulings', 'signature', caseSignature),
        findIdByColumnValue('user_messages', 'content', userMessage),
        findIdByColumnValue('system_messages', 'content', systemMessage)
    ]);
}

async function findIdByColumnValue(tableName, columnName, value) {
    const query = `SELECT id FROM ${tableName} WHERE ${columnName} = ?`;
    const connection = await createTCPConnection();

    try {
        const [rows] = await connection.execute(query, [value]);

        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error connecting to the database or executing query:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}