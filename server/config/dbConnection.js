import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '16121972Samarth!',
    database: 'project_manage'
})

export default db;