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

