import db from '../config/dbConnection.js'

// ! Showing subtasks
const showSubtasks = async (projectId) => {
    const sql = `
        SELECT * FROM Subtasks sb
        JOIN tasks t
        ON sb.task_id = t.id
        JOIN projects p
        ON t.project_id = p.id
        WHERE p.id = projectId
    `

    const [table] = await db.query(sql,[
        projectId
    ])

    return table.insertId;
}
