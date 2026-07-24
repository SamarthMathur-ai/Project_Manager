import db from "../config/dbConnection.js";

const createUser = async (username, email, hashedPassword, name) => {

    
    const sql = `
        INSERT INTO user (username, email, password, name)
        VALUES(?,?,?,?)
    `;

    const [result] = await db.query(sql, [
        username,
        email,
        hashedPassword,
        name
    ])

    return result.insertId;
};


const findUserByUsername = async (username) =>{
    const sql = `
        SELECT * FROM user WHERE username = ?;
    `;
    const [rows] = await db.query(sql,[
        username
    ])
    return rows[0]||null;
};


const findUserByRefreshToken = async (refreshToken) => {
    const sql = `
        SELECT * FROM user WHERE refresh_token = ?;
    `
        
    const [table] = await db.query(sql,[
        refreshToken
    ])
    return table[0]||null;
}


const updateRefreshToken = async (refreshToken, username) =>{
    const sql = `
    UPDATE user SET refresh_token = ? WHERE username = ?
    `
    const [result] = await db.query(sql,[
        refreshToken, 
        username
    ]);
    return result.affectedRows;
}


const refreshTokenToNull = async (refreshToken) => {
    const sql = `
        UPDATE user SET refresh_token = NULL WHERE refresh_token = ?
    `
    const [result] = await db.query(sql,[
        refreshToken
    ]);
    return result.affectedRows;
}



export default {
    createUser,
    findUserByUsername,
    findUserByRefreshToken,
    updateRefreshToken,
    refreshTokenToNull
}