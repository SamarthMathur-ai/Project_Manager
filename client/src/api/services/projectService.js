import api from '../axios.js'; 

export const fetchProjects = () => {
    return api.get('/api/projectPage/showProjects');
}