import subTasksModel from "../models/subTasksModel.js";

// ! Show subtasks // done
const showSubTasks = async (req, res) => {
    const {projectId} = req.params; // * Getting the id from the url not from the body llike userId
    try {
        if (!projectId) { 
            return res.status(400).json({ // ? 400 is bad request error when user makes a bad request 
                message: "projectId is required"
            });
        }
        const table = await subTasksModel.showSubtasks(projectId);
        const project = await subTasksModel.showProject(projectId);
        return res.status(200).json({
            project: project[0],
            subTasks: table,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}


// ! Insert a subtask 
const insertSubTask = async(req, res) => {
    const {name, taskId, startDate, endDate, status} = req.body;
    if(!name || name.trim()==="") {
        return res.status(400).json({message :"Enter a valid name"})
    }

    if(!taskId || !startDate || !endDate || !status) {
        return res.status(400).json({message: "Enter valid credentials"})
    }

    if (new Date(endDate) < new Date(startDate)) { // ? creating date objects as they
        return res.status(400).json({
            message: "End date cannot be before start date"
        });
    }
    try {
        const table = await subTasksModel.addSubTask(name, taskId, startDate, endDate, status);
        return res.status(201).json({message: "Subtask successfully created."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}


// ! Showing the task //done
const showTasks = async(req,res) => {
    const {projectId} = req.params;
    try {
        if (!projectId) { 
            return res.status(400).json({ // ? 400 is bad request error when user makes a bad request 
                message: "projectId is required"
            });
        }
        const table = await subTasksModel.showTask(projectId);
        return res.status(200).json(table)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}


// ! Adding task // done
const addTask = async(req,res) => {
    const {name, projectId} = req.body;
    if(!name || name.trim()==="") {
        return res.status(400).json({message :"Enter a valid name"})
    }
    if(!projectId) {
        return res.status(400).json({message: "ProjectId is required."})
    }
    try {
        const table = await subTasksModel.addTask(name, projectId);
        return res.status(201).json({message: "Subtask successfully created.", insertId: table})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}


// ! showing team members
const showTeamMembers = async (req, res)=> {
    const id = req.user.id;
    try {
        const table = await subTasksModel.showTeamMemb(id);
        return res.status(200).json(table);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}


// ! Adding team members to subtask
const addTeamToSubtasks = async (req, res)=> {
    const {subTaskId, teamMemberId} = req.params;
    if(!subTaskId || !teamMemberId) {
        return res.status(400).json({message: "Enter valid credentials."});
    }
    try {
        const result = await subTasksModel.addTeamSub(subTaskId, teamMemberId);
        res.status(201).json({message: "Team member successfully added to the subtask."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}


//! Deleting team members to subtask
const delTeamToSubtasks = async (req, res)=> {
    const {subTaskId, teamMemberId} = req.params;
    if(!subTaskId || !teamMemberId) {
        return res.status(400).json({message: "Enter valid credentials."});
    }
    try {
        const result = await subTasksModel.delTeamSub(subTaskId, teamMemberId);
        res.status(201).json({message: "Team member successfully deleted."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})        
    }
}



// ! Deleting the subtask //done
const deleteSubTask = async (req, res)=> {
    const {subTaskId} = req.params;
    if(!subTaskId) {
        return res.status(400).json({message: "Enter valid subtaskId."});
    }
    try {
        const result = await subTasksModel.delSubTask(subTaskId);
        res.status(204).json({message: "Subtask deleted successfully."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}


// ! Changing status of subtask // done
const changingStatusSubTask = async (req, res) => {
    const {subTaskId, status} = req.params;
    if(!subTaskId || !status) {
        return res.status(400).json({message: "Enter valid credentials."});
    }
    const allowedStatus = ["Ongoing", "Completed"];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }
    try {
        const result = await subTasksModel.chStSub(subTaskId, status);
        return res.status(200).json({message: "Status changed successfully."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}

// ! showing assigned team member
const shassteam = async (req, res) => {
    console.log("1. Controller reached");
    const {subTaskId} = req.params;
    console.log(`Subtask id is ${subTaskId}`)
    if(!subTaskId) {
        return res.status(400).json({message: "Subtask id is not correct"});
    }
    console.log("if statement crossed");
    try {
        const result = await subTasksModel.retrAssTeam(subTaskId);
        console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}

export default {
    shassteam,
    showSubTasks,
    insertSubTask,
    showTasks,
    addTask,
    showTeamMembers,
    addTeamToSubtasks,
    deleteSubTask,
    changingStatusSubTask,
    delTeamToSubtasks
}