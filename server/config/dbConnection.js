import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

// 1. Get the absolute path of the 'config' folder on your hard drive
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Point directly to the .env file (assuming it is inside your 'server' folder)
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// 3. DIAGNOSTIC CHECK: Let's prove it works before the database crashes!
console.log("--- DATABASE CREDENTIAL CHECK ---");
console.log("Attempting to load .env from:", envPath);
console.log("DB_USER found:", process.env.DB_USER ? "YES" : "NO (Still Undefined)");
console.log("---------------------------------");

const db = mysql.createPool({ // * connection pool is better as it can handle multiple connection at the same time.
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export default db;