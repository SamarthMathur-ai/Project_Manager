import api from '../axios.js';

export const showTasks = (projectId) => {
    return api.get(`/api/subTaskPage/showTasks/project/${projectId}`)
}

export const addTasks = () => {
    return api.get(`/api/subTaskPage/addTask`)
}