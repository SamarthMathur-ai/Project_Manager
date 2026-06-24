import express from 'express';
import dashboardController from '../controller/dashboardController.js';

const router = express.Router();

// ! Route for total project number
router.get('/totalProjNum', dashboardController.TotalProjNum);

// ! Route for completed project number
router.get('/totalCompProjNum', dashboardController.CompletedProjNum);

// ! Route for attention needed project number
router.get('/totalAttenProjNum', dashboardController.AttentionProjNum);

// ! Route to show all ongoing projects
router.get('/showTotalOngoingProjects', dashboardController.showOngoingProj);

// ! Route to show all attention needed projects
router.get('/showTotalAttentionProjects', dashboardController.showAttentionProj);

export default router;