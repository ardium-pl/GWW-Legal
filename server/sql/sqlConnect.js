import mysql from 'mysql2/promise';

export async function createTCPConnection(){
    return mysql.createConnection({
        host: MYSQLHOST,
        user: MYSQLUSER,
        database: MYSQL_DATABASE,
        password: MYSQLPASSWORD,
        port: MYSQLPORT
    });
}