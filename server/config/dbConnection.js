// import path from 'path';
// import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caPath = path.resolve(__dirname, "../ca.pem");

// 1. Get the absolute path of the 'config' folder on your hard drive
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// 2. Point directly to the .env file (assuming it is inside your 'server' folder)
// const envPath = path.resolve(__dirname, '../.env');

// * Making this safer that way , if .env is missing, your server fails immediately instead of failing later with confusing database errors.
// const result = dotenv.config({ path: envPath });
// if (result.error) {
//     console.error("Failed to load .env file:", result.error);
//     process.exit(1); // * Telling the code to stop the program immediately 0 means everything finished suceessfully and 1 means general error and both end the code
// }

// // 3. DIAGNOSTIC CHECK: Let's prove it works before the database crashes!
// console.log("--- DATABASE CREDENTIAL CHECK ---");
// console.log("Attempting to load .env from:", envPath);
// console.log("DB_USER found:", process.env.DB_USER ? "YES" : "NO (Still Undefined)");
// console.log("---------------------------------");

const db = mysql.createPool({ // * connection pool is better as it can handle multiple connection at the same time.
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        ca: fs.readFileSync(caPath),
    },


    waitForConnections: true, // * if there are several connection and  if there is no waithing the waiting file or which is coming after all the slots are already filled will throw an error
    connectionLimit: 10, // * maximum number of simultaneous database connection the 11th connection has to wait until one of the 10 becomes free
    queueLimit: 0 // * what can be the queue limit if it is set to 0 there can be an infinite list.
});
(async () => {
    try {
      const conn = await db.getConnection();
      console.log("✅ Connected to Aiven");
      conn.release();
    } catch (err) {
      console.error("❌ Connection failed:", err);
    }
  })();
export default db;