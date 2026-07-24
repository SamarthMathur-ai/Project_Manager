import projectsModel from "../models/projectsModel.js";

// ! To show projects list
const showProjects = async (req, res) => {
    const id = req.user.id;
    try {
        
        const table = await projectsModel.showProjects(id);
        if(table) {// * even if there is nothing the server will send 200 so checking the lenggth.
            return res.status(200).send(table);
        } else {
            return res.status(404).json(table);
        }
    } catch (error) {
        console.error(error);
         return res.status(500).json({message: "Internal Server Error"})
    }
    
}


// ! To insert a new project
const insertProject = async (req, res) => {
    // * name, image_path, starting_date, end_date, status, priority, id
    const id = req.user.id;
    const {name, image_path, starting_date, end_date, status, priority} = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Project name cannot be empty"
        });
    }

    if(!starting_date || !end_date) {
        return res.status(400).json({
            message: "Starting date and End date are required"
        });
    }

    try {
        
        const insertedId = await projectsModel.addProject(name, image_path, starting_date, end_date, status, priority, id);
        if(insertedId) {
            return res.status(201).json({message: "Project Successfully Inserted!!"});
        } else {
            return res.status(500).json({message: "There was some problem inserting the table."});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// ! To insert a new task
const insertTask = async (req, res) => {
    const {name, projectId} = req.body;
    if (!projectId || !name || name.trim() === "") {
        return res.status(400).json({
            message: "projectId and Task name are required"
        });
    }
    try {
        const insertedId = await projectsModel.addTask(name, projectId);
        if(insertedId) {
            return res.status(201).json({message: "Task Successfully Inserted!!"});
        } else {
            return res.status(500).json({message: "There was some problem inserting the task."});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// ! To change the status of the project
const changeStatus = async (req,res) => {
    const {projectId, status} = req.params;
    // ! make this change in all if you have time that is.
    
    if(!projectId || !status) {
        return res.status(400).json({
            message: "Projedt ID and Status are required"
        });
    }
    try {
        const affectedRows = await projectsModel.changeStatus(projectId, status);
        if(affectedRows>0) {
            return res.status(200).json({message: "Status Successfully Changed!!"});
        } else {
            return res.status(500).json({message: "There was some problem changing the status."});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"}); 
    }
}


// ! To show active projects
const activeProj = async (req, res) =>  {
    const id = req.user.id;
    try {
        const table = await projectsModel.seeActive(id);
        
        return res.status(200).json(table)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}


// ! To show completed projects
const compProj = async (req, res) =>  {
    const id = req.user.id;
    try {
        const table = await projectsModel.seeCompleted(id);
        
        return res.status(200).json(table)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}


// ! To show Overdue projects
const overProj = async (req, res) =>  {
    const id = req.user.id;
    try {
        const table = await projectsModel.seeOverdue(id);
        
        return res.status(200).json(table)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}


// ! searchBar
const searchBar = async (req, res) =>  {
    const id = req.user.id;
    const {name} = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Name is required"
        });
    }
    try {
        const table = await projectsModel.searchbar(id, name);
        
        return res.status(200).json(table)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}


// ! getting normal name
const name = async (req, res) => {
    const id = req.user.id
    try {
        const user = await projectsModel.name(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({name: user.name})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}
export default {
    showProjects,
    insertProject,
    insertTask,
    changeStatus,
    activeProj,
    compProj,
    overProj,
    searchBar,
    name
}