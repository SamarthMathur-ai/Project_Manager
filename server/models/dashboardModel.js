import db from "../config/dbConnection.js"

// ! Show number of all projects
const totalProjNum = async (userId) =>{
    const sql = `
        SELECT COUNT(*) AS totalProjects FROM projects WHERE user_id = ?
    `
    const [result] = await db.query(sql,[
        userId
    ])

    return result[0].totalProjects;
}

// ! Show number of all completed projects
const compProjNum = async (userId) => {
    const sql = `
        SELECT COUNT(*) AS totalCompProj
        FROM projects
        WHERE user_id = ? AND status = ?
    `

    const [result] = await db.query(sql,[
        userId,
        `Completed`
    ])

    return result[0].totalCompProj
}

// ! Shows number of all projects that require attention
const attenProjNum = async (userId) => {
    const sql = `
        SELECT COUNT(*) AS totalAttenProj
        FROM projects
        WHERE user_id = ? AND DATEDIFF(end_date, CURRENT_DATE) < 3
    `

    const [result] = await db.query(sql,[
        userId
    ])

    return result[0].totalAttenProj
}

// ! Shows all ongoing projects
const showOngProj = async (userId) => {
    const sql = `
        SELECT * FROM projects
        WHERE user_id = ? AND status = ?
    `

    const [result] = await db.query(sql,[
        userId,
        `Ongoing`
    ])

    return result;
}

// ! Shows projects that need attention
const showAttenProj = async (userId) => {
    const sql = `
        SELECT * FROM projects
        WHERE user_id = ? AND DATEDIFF(end_date, CURRENT_DATE) < 3
    `

    const [result] = await db.query(sql,[
        userId
    ])
    
    return result;
}

export default {
    totalProjNum,
    compProjNum,
    attenProjNum,
    showAttenProj,
    showOngProj
}


