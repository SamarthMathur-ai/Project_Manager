import teamMembersModel from '../models/teamMembersModel.js';

const getAllTeamMember = async(req, res) => {
    try {
        const id = req.user.id;
        // * apply sql query
        const [team_members] = await teamMembersModel.getTeamMembers(id);
        // * send response
        res.status(201).json(team_members)
    } catch (error) {
        console.log(error);
        res.status(501).json({
            error: error.message
        })
    }
}


const insertTeamMember = async(req,res) => {
    try {
        const { name, role, linkedin_link, image_path } = req.body; // Extract from body
        const userId = req.user.id; // Securely get from the token
        //name, role, linkedin_link, image_path, user_id
        const result = await teamMembersModel.insertTeamMember(name, role, linkedin_link, image_path, userId);
        return res.status(201).send("User Inserted")
    } catch (error) {
        console.log(error)
        res.status(501).json({
            error: error.message
        })
    }
}


export default {
    getAllTeamMember,
    insertTeamMember
}