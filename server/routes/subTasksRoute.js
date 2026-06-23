import express from 'express'
import subTasksController from '../controller/subTasksController.js'

const router = express.Router();

// ! Route for showing tasks
router.get("/showTasks", subTasksController.showTasks);

// ! Route for adding task
router.get("/addTask", subTasksController.addTask);

// ! Route for showing subtasks
router.get("/showSubTasks", subTasksController.showSubTasks);

// ! Route for showing task
router.get("/addSubTask", subTasksController.insertSubTask);


export default router;