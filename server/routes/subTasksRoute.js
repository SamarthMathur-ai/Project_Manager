import express from 'express'
import subTasksController from '../controller/subTasksController.js'

const router = express.Router();

// ! Route for showing tasks
router.get("/showTasks", subTasksController.showTasks);

// ! Route for adding task
router.post("/addTask", subTasksController.addTask);

// ! Route for showing subtasks
router.get("/showSubTasks/:projectId", subTasksController.showSubTasks);

// ! Route for adding subtask
router.post("/addSubTask", subTasksController.insertSubTask);

// ! Route for showing Team members
router.get("/showTeamMembers", subTasksController.showTeamMembers);

// ! Route for adding a Team member to subtask
router.post("/addTeamMembSub/subtask/:subTaskId/member/:teamMemberId", subTasksController.addTeamToSubtasks);

// ! Route for deleting a Team member to subtask
router.delete('/delTeamMembSub/subtask/:subTaskId/member/:teamMemberId', subTasksController.delTeamToSubtasks);

// ! Route for deleting a subtask
router.delete("/delSubTask/:subTaskId", subTasksController.deleteSubTask);

// ! Route for changing status of a subtask
router.post("/changeStatusSub/subtask/:subTaskId/status/:status", subTasksController.changingStatusSubTask);

// ! To get assigned team member
router.get("/getAssignedMemb/:subTaskId", subTasksController.shassteam);

export default router;