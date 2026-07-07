import api from "../axios";

export const getTotalProjects = () => {
    return api.get("/api/dashboardPage/totalProjNum");
};

export const getCompletedProjects = () => {
    return api.get("/api/dashboardPage/totalCompProjNum");
};

export const getAttentionProjects = () => {
    return api.get("/api/dashboardPage/totalAttenProjNum");
};

export const getOngoingProjects = () => {
    return api.get("/api/dashboardPage/showTotalOngoingProjects");
};

export const getAttentionProjectsList = () => {
    return api.get("/api/dashboardPage/showTotalAttentionProjects");
};