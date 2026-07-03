import express from 'express';
import projectsController from "../controller/projectsController.js";

const router = express.Router();

// ! Route to show projects
router.get("/showProjects", projectsController.showProjects);

// ! Route to add project
router.post("/addProject", projectsController.insertProject);

// ! Route to add task to a project
router.post("/addTask", projectsController.insertTask);

// ! Route to change status of a project
router.patch("/changeStatus", projectsController.changeStatus);

// ! Router to see active projects
router.get('/showActProjects', projectsController.activeProj);

// ! Router to see completed projects
router.get('/showCompProjects', projectsController.compProj)

// ! Router to see overdue projects
router.get('/showOverProjects', projectsController.overProj)

// ! Router for search bar
// ! this is obsolete only make search rouote when you have to query from a large database we already filter beforehand on the basis of user
router.get('/searchBar', projectsController.searchBar)

export default router;

