import subTasksModel from "../models/subTasksModel.js";

// ! Show subtasks
const showSubTasks = async (req, res) => {
    const {projectId} = req.body;
    try {
        if (!projectId) { 
            return res.status(400).json({ // ? 400 is bad request error when user makes a bad request 
                message: "projectId is required"
            });
        }
        const table = await subTasksModel.showSubtasks(projectId);
        return res.status(200).json(table)
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


// ! Showing the task
const showTasks = async(req,res) => {
    const {projectId} = req.body;
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


// ! Adding task 
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
        return res.status(201).json({message: "Subtask successfully created."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}



export default {
    showSubTasks,
    insertSubTask,
    showTasks,
    addTask
}