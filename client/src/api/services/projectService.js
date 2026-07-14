import api from '../axios.js'; 

export const fetchProjectsByFilter = (filter) => {
    const routes = {
        'All':'/api/projectPage/showProjects',
        'Active':'/api/projectPage/showActProjects',
        'Completed':'/api/projectPage/showCompProjects',
        'Overdue':'/api/projectPage/showOverProjects'
    };
    console.log("Requesting URL:", routes[filter] || routes['All']);
    return api.get(routes[filter] || routes['All']);
}


export const fetchSubtasks = (projectId) => {
    return api.get(`/api/subTaskPage/showSubTasks/${projectId}`);
}

export const deleteSubtasks = (subTaskId) => {
    return api.delete(`/api/subTaskPage/delSubTask/${subTaskId}`)
}

export const manifestTeamMembers = () => {
    return api.get(`/api/subTaskPage/showTeamMembers`)
}

export const manifestAssignedMemb = (subTaskId) => {
    return api.get(`/api/subTaskPage/getAssignedMemb/${subTaskId}`)
}

export const addMemberSubTask = (subTaskId, memberId) => {
    return api.post(`/api/subTaskPage/addTeamMembSub/subtask/${subTaskId}/member/${memberId}`)
}

export const delMemberSubTask = (subTaskId, memberId) => {
    return api.delete(`/api/subTaskPage/delTeamMembSub/subtask/${subTaskId}/member/${memberId}`)
}

export const chngSubStatus = (subTaskId, status) => {
    return api.post(`/api/subTaskPage/changeStatusSub/subtask/${subTaskId}/status/${status}`)
}

export const chngProjStatus = (projId, status) => {
    return api.patch(`api/projectPage/changeStatus/project/${projId}/status/${status}`)
}

export const name = () => {
    return api.get(`api/projectPage/name`)
}