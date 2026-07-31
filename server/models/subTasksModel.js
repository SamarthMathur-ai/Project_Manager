import db from '../config/dbConnection.js'

// !0. Show Project detail // done
const showProject = async (projectId) => {
    const sql = `
        SELECT * FROM projects WHERE id = ?
    `

    const [table] = await db.query(sql,[
        projectId
    ])

    return table;
}

// !1.  Showing subtasks // done
const showSubtasks = async (projectId) => {
    const sql = `
        SELECT 
            sb.id AS subtask_id,   -- Unique ID for the subtask
            sb.name AS subtask_name,
            t.name AS task_name,
            t.id AS task_id,       -- Unique ID for the task
            p.id AS project_id,    -- Unique ID for the project
            sb.start_date, 
            sb.end_date, 
            sb.status
        FROM subtasks sb
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

// !2.  Adding Tasks // done
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


// !3. Showing Tasks // done
const showTask = async (projectId) => {
    const sql = `
        SELECT * FROM tasks WHERE project_id = ?
    `
    const [table] = await db.query(sql,[
        projectId
    ])
    return table
}


// !4. Showing team members // done
const showTeamMemb = async (userId) => {
    const sql = `
        SELECT * FROM team_members WHERE user_id = ?
    `

    const [table] = await db.query(sql,[
        userId
    ])
    return table
}


// !5. Adding team member to subtasks // done
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


// !5.5 Deleting team member from subtasks // done
const delTeamSub = async (subTaskId, teamMemberId) => {
    const sql = `
        DELETE FROM subtasks_assignees
        WHERE subtask_id = ? AND team_member_id = ?
    `
    const [table] = await db.query(sql,[
        subTaskId,
        teamMemberId
    ])
    return table.affectedRows;
}

// !6. Adding Subtasks // done
const addSubTask = async (name, taskId, startDate, endDate, status) => {
    const sql = `
        INSERT INTO subtasks (name, task_id, start_date, end_date, status)
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


// !7. Deleting subtask // done
const delSubTask = async (subtaskId) => {
    const sql = `
        DELETE FROM subtasks
        WHERE id = ?
    `
 
    const [table] = await db.query(sql,[
        subtaskId
    ])

    return table.affectedRows;
}

// !8. Changing status of subtask // done
const chStSub = async (subTaskId, status) => {
    const sql = `
        UPDATE subtasks
        SET status = ?
        WHERE id = ?
    `

    const [table] = await db.query(sql,[
        status,
        subTaskId
    ])

    return table.affectedRows;
}

// !9. To see assigned teammembers for a particular subtasks
const retrAssTeam = async (subTaskId) => {
    const sql = `
        SELECT team_member_id
        FROM subtasks_assignees
        WHERE subtask_id = ?
    `
    const [table] = await db.query(sql,[
        subTaskId
    ])
    return table;
}


export default {// ? without default we have to specifically mention the function name where this file is imported
    retrAssTeam,
    showProject,
    showSubtasks,
    addTask,
    showTask,
    showTeamMemb,
    addTeamSub,
    addSubTask,
    delSubTask,
    chStSub,
    delTeamSub
} 
