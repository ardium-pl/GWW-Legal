import mysql from 'mysql2/promise';

export async function createTCPConnection(){
    return mysql.createConnection({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQLPASSWORD,
        port: process.env.MYSQLPORT
    });
}