import dashboardModel from "../models/dashboardModel.js";

// ! Show total projects total number
const TotalProjNum = async (req, res) => {
    const id = req.user.id;
    try {
        const num = await dashboardModel.totalProjNum(id);
        return res.status(200).json({ans: num})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

// ! Show total completed projects number
const CompletedProjNum = async (req,res) => {
    const id = req.user.id;
    try {
        const num = await dashboardModel.compProjNum(id);
        return res.status(200).json({ans: num})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message})
    }
}

// ! Show total projects number that needs attention
const AttentionProjNum = async (req,res) => {
    const id = req.user.id;
    try {
        const num = await dashboardModel.attenProjNum(id);
        return res.status(200).json({ans: num})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message})
    }
}

// ! Show total ongoing projects
const showOngoingProj = async (req, res) => {
    const id = req.user.id;
    try {
        const table = await dashboardModel.showOngProj(id);
        return res.status(200).json(table)
    } catch (err){
        console.log(err);
        return res.status(500).json({error: err.message})
    }
}

// ! Show total projects that need attention
const showAttentionProj = async (req, res) => {
    const id = req.user.id;
    try {
        const table = await dashboardModel.showAttenProj(id);
        return res.status(200).json(table)
    } catch (err){
        console.log(err);
        return res.status(500).json({error: err.message})
    }
}


export default {
    TotalProjNum,
    CompletedProjNum,
    AttentionProjNum,
    showOngoingProj,
    showAttentionProj
}