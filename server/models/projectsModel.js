import db from '../config/dbConnection.js';


// ! Showing projects
const showProjects = async (userId)=> {
    const sql = `
        SELECT * FROM projects WHERE user_id = ?
    `
    const [result] = await db.query(sql,[
        userId
    ])
    return result;
}

// ! Adding Projects 
const addProject = async (name, image_path, starting_date, end_date, status, priority, id) => {
    const sql = `
        INSERT INTO projects (name, image_path, starting_date, end_date, status, priority, user_id)
        VALUES
        (?,?,?,?,?,?,?)
    `

    const [result] = await db.query(sql,[
        name,
        image_path,
        starting_date,
        end_date,
        status,
        priority,
        id
    ])

    return result.insertId;
}


// ! Adding Tasks
const addTask = async (name, projectId)=> {
    const sql = `
        INSERT INTO tasks (name, project_id)
        VALUES
        (?,?)
    `

    const [result] = await db.query(sql,[
        name,
        projectId
    ])

    return result.insertId;
}

// ! Changing the status of the project
const changeStatus = async (projectId,status) => {
    const sql = `
        UPDATE projects
        SET status = ?
        where id = ?;
    `
    const [table] = await db.query(sql,[
        status,
        projectId
    ])

    return table.affectedRows;
}


export default {
    showProjects,
    addProject,
    addTask,
    changeStatus
}




