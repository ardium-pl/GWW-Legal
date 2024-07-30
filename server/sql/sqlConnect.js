import mysql from 'mysql2/promise';
import 'dotenv/config';

export async function createTCPConnection(){
    return mysql.createConnection(process.env.MYSQL_URL);
}