import teamMembersModel from '../models/teamMembersModel.js';

const getAllTeamMember = async (req, res) => {
    try {
        const id = req.user.id;

        const team_members = await teamMembersModel.getTeamMembers(id);

        return res.status(200).json(team_members);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error."
        });
    }

};
const insertTeamMember = async (req, res) => {

    try {
        const { name, role, linkedin_link, image_path } = req.body;
        const userId = req.user.id;

        if(!name || name.trim() === ""){
            return res.status(400).json({
                message: "Name is required"
            })
        }

        if(!role || role.trim() ==="") {
            return res.status(400).json({
                message: "Role is required"
            });
        }

        // * Optional Image
        const imagePath = image_path?.trim() || null;

        await teamMembersModel.insertTeamMember(
            name,
            role,
            linkedin_link,
            imagePath,
            userId
        );

        return res.status(201).json({
            message: "Member Added Successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error."
        });
    }
};

export default {
    getAllTeamMember,
    insertTeamMember
};