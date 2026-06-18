import express from 'express';
import teamControll from '../controller/teamMembersController.js'

const router = express.Router();

// ! get all member list
router.get("/getMembersList", teamControll.getAllTeamMember);


// ! insert team member
router.post("/insertMember", teamControll.insertTeamMember);

export default router;