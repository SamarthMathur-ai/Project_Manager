import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./AddSubtask.css";
import { useState } from "react";
import { useEffect } from "react";
import { showTasks } from "../api/services/subProjectService";
import api from "../api/axios";

function AddSubtask() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [newTaskName, setNewTaskName] = useState("");
    const [message, setMessage] = useState("");
    const [showAddTaskInput, setShowAddTaskInput] = useState(false);

    //* In projectdetail page we already have assigned so the assigned lived in the backend but not here it will have to live in frontend for some time before we add it to the database
    //* for that time it will be stored in a variable which are as follow
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskDropdown, setShowTaskDropdown] = useState(false);
    //* In React, null and false are used as initial values to define the starting state of your variables. They act as "empty" or "off" states before your application has any real data to show.
    const [taskId, setTaskId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const addTask = async(e) => {
        e.preventDefault(); // This stops the page from defaulting
        try {
            const response = await api.post(
                `/api/subTaskPage/addTask`,
                {
                    name: newTaskName,
                    projectId: id
                },
            )
            console.log(response.data);
            if(response.status===201) {
                setMessage("Task Added Successfully");
                const newTask = { id: response.data.insertId, name: newTaskName };

                setTasks(prev => [...prev, newTask]);
                setSelectedTask(newTask);
                setTaskId(newTask.id);
                setNewTaskName("");
                setShowAddTaskInput(false)
                setShowTaskDropdown(false);
            }
        } catch(error) {
            console.error("Full error object:", error);
            setMessage(
                error.response?.data?.message ||
                'Something Went Wrong'
            );
            console.log(error);
        }
    }
    
    const addSubTask = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                '/api/subTaskPage/addSubTask',
                {
                    name,
                    taskId,
                    startDate,
                    endDate,
                    status: "Ongoing"
                }
            )
            console.log(response.data);
            if(response.status===201) {
                setMessage("Sub Task Added Successfully");
                setTimeout(()=> {
                    navigate(`/project/${id}`)
                },1000)
            }
        } catch (error) {
            console.error("Full error object:", error);
            setMessage(
                error.response?.data?.message ||
                'Something Went Wrong'
            );
        }
    }

    

    useEffect(()=>{
        const getTasks = async()=>{
            try {
                setLoading(true);
                const revealTasks = await showTasks(id);
                console.log(revealTasks.data);
                setTasks(revealTasks.data);
            } catch (error) {
                console.error("Error feching data:",error);
            } finally {
                setLoading(false);
            }
            
        }
        getTasks();
    },[id])

    if(loading) {
        return (
          <div className="project-details-page">
            <Sidebar />
            <div className="PD-main">
              <div style={{ padding: "50px", textAlign: "center" }}>Loading your projects...</div>
            </div>
          </div> 
        );
    }


    return (
        <div className="add-subtask-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-wrapper">

                    <div className="form-card">

                        <h1>Add Subtask</h1>
                        <p>Project ID: {id}</p>

                        <form onSubmit={addSubTask}>

                            <input 
                                type="text" 
                                placeholder="Subtask Name" 
                                value = {name}
                                onChange={(e)=>setName(e.target.value)}
                            />

                            <div className="dropdown-container">
                                <button type="button" onClick={() => setShowTaskDropdown(!showTaskDropdown)}>
                                    {selectedTask ? selectedTask.name : "Select Task"}
                                </button>

                                {showTaskDropdown && (
                                    <div className="task-dropdown">
                                        {tasks.map(task => (
                                            <label key={task.id}>
                                                <input
                                                    type="radio"
                                                    name="selectedTask" // * So that html can group all the radio buttons
                                                    checked={selectedTask?.id === task.id}
                                                    onChange={() => {
                                                        setTaskId(task.id)
                                                        setSelectedTask(task);
                                                        setShowTaskDropdown(false);
                                                    }}
                                                />
                                                {task.name}
                                            </label>
                                        ))}
                                        {showAddTaskInput ? (
                                            <div className="add-task-inline">
                                                <input
                                                    type="text"
                                                    placeholder="New task name"
                                                    value={newTaskName}
                                                    onChange={(e) => setNewTaskName(e.target.value)}
                                                />
                                                <button type="button" onClick={addTask}>
                                                    Confirm
                                                </button>
                                            </div>
                                        ) : (
                                            <button type="button" onClick={() => setShowAddTaskInput(true)}>
                                                + Add Task
                                            </button>
                                        )}
                                        
                                        
                                    </div>
                                )}

                            </div>
                            <label>Start Date</label>
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e)=>setStartDate(e.target.value)}
                            />

                            <label>End Date</label>
                            <input 
                                type="date"
                                value={endDate}
                                onChange={(e)=>setEndDate(e.target.value)} 
                            />

                            

                            <button type="submit">
                                Add Subtask
                            </button>
                            
                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddSubtask;