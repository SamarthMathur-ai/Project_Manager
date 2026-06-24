import express from 'express'
import subTasksController from '../controller/subTasksController.js'

const router = express.Router();

// ! Route for showing tasks
router.get("/showTasks", subTasksController.showTasks);

// ! Route for adding task
router.post("/addTask", subTasksController.addTask);

// ! Route for showing subtasks
router.get("/showSubTasks", subTasksController.showSubTasks);

// ! Route for adding subtask
router.post("/addSubTask", subTasksController.insertSubTask);

// ! Route for showing Team members
router.get("/showTeamMembers", subTasksController.showTeamMembers);

// ! Route for adding a Team member to subtask
router.post("/addTeamMembSub", subTasksController.addTeamToSubtasks);

// ! Route for deleting a subtask
router.delete("/delSubTask", subTasksController.deleteSubTask);

// ! Route for changing status of a subtask
router.post("/changeStatusSub", subTasksController.changingStatusSubTask);

export default router;