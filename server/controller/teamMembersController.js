import teamMembersModel from '../models/teamMembersModel.js';

const getAllTeamMember = async (req, res) => {
    try {
        const id = req.user.id;

        const team_members = await teamMembersModel.getTeamMembers(id);

        res.status(200).json(team_members);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }

};
const insertTeamMember = async (req, res) => {
    console.log("========== INSERT MEMBER ==========");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    try {
        const { name, role, linkedin_link, image_path } = req.body;
        const userId = req.user.id;

        await teamMembersModel.insertTeamMember(
            name,
            role,
            linkedin_link,
            image_path,
            userId
        );

        res.status(201).json({
            message: "Member Added Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
};

export default {
    getAllTeamMember,
    insertTeamMember
};