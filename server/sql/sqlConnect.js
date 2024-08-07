import mysql from 'mysql2/promise';

export async function createTCPConnection(){
    return mysql.createConnection(process.env.MYSQL_URL);
}