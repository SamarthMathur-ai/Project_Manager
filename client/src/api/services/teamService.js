import api from "../axios";

export const getMembers = () => {
    return api.get("/api/teamMemberPage/getMembersList");
};

export const addMember = (member) => {
    return api.post("/api/teamMemberPage/insertMember", member);
};