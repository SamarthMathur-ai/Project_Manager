import db from '../config/dbConnection.js';

const getTeamMembers = async (id) => {
    const sql= `
        SELECT * FROM team_members WHERE user_id = ?
    `
    const [table] = await db.query(sql,[
        id
    ])
    return table;
}


const insertTeamMember = async (member_name, member_role, member_linkedin_link, member_image_path, userid)=>{
    //name, role, linkedin_link, image_path, user_id
    const sql2 = `
        INSERT INTO team_members (name, role, linkedin_link, image_path, user_id)
        VALUES
        (?,?,?,?,?)
    `
    const [result] = await db.query(sql2,[
        member_name,
        member_role,
        member_linkedin_link,
        member_image_path,
        userid
    ])

    return result.insertId;    
}


export default {
    getTeamMembers,
    insertTeamMember
}