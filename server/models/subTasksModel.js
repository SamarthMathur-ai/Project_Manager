import db from '../config/dbConnection.js'

// !1.  Showing subtasks
const showSubtasks = async (projectId) => {
    const sql = `
        SELECT * FROM Subtasks sb
        JOIN tasks t
        ON sb.task_id = t.id
        JOIN projects p
        ON t.project_id = p.id
        WHERE p.id = ?
    `

    const [table] = await db.query(sql,[
        projectId
    ])

    return table;
}

// ! Showing attention needed subtasks
// ! will make this in frontend only.

// !2.  Adding Tasks
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


// !3. Showing Tasks
const showTask = async (projectId) => {
    const sql = `
        SELECT * FROM tasks WHERE project_id = ?
    `
    const [table] = await db.query(sql,[
        projectId
    ])
    return table
}


// !4. Showing team members
const showTeamMemb = async (userId) => {
    const sql = `
        SELECT * FROM team_members WHERE user_id = ?
    `

    const [table] = await db.query(sql,[
        userId
    ])
    return table
}


// !5. Adding team member to subtasks
const addTeamSub = async (subTaskId, teamMemberId) => {
    const sql = `
        INSERT INTO subtasks_assignees
        (subtask_id, team_member_id)
        VALUES
        (?,?)
    `

    const [table] = await db.query(sql,[
        subTaskId,
        teamMemberId
    ])
    
    return table.insertId;
}


// !6. Adding Subtasks
const addSubTask = async (name, taskId, startDate, endDate, status) => {
    const sql = `
        INSERT INTO Subtasks (name, task_id, start_date, end_date, status)
        VALUES
        (?,?,?,?,?)
    `

    const [table] = await db.query(sql, [
        name,
        taskId,
        startDate,
        endDate,
        status
    ])

    return table.insertId;
}


// !7. Deleting subtask
const delSubTask = async (subtaskId) => {
    const sql = `
        DELETE FROM Subtasks
        WHERE id = ?
    `
 
    const [table] = await db.query(sql,[
        subtaskId
    ])

    return table.affectedRows;
}

// !8. Changing status of subtask
const chStSub = async (subTaskId, status) => {
    const sql = `
        UPDATE Subtasks
        SET status = ?
        WHERE id = ?
    `

    const [table] = await db.query(sql,[
        status,
        subTaskId
    ])

    return table.affectedRows;
}


export default {// ? without default we have to specifically mention the function name where this file is imported
    showSubtasks,
    addTask,
    showTask,
    showTeamMemb,
    addTeamSub,
    addSubTask,
    delSubTask,
    chStSub
} 
