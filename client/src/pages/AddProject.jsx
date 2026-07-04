import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./AddProject.css";
import {useState} from 'react';
import api from '../api/axios.js';
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

function AddProjects() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [starting_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [priority, setPriority] = useState(""); // * Now user may leave it barren
    const [image_path, setImagePath] = useState("");
    const [message, setMessage] = useState("");
    // * name, image_path, starting_date, end_date, status, priority, id
    const addProjectFunc = async (e) => {
        e.preventDefault(); // This stops the page from reloading
        try {
            const response = await api.post(
                '/api/projectPage/addProject',
                {
                    name,
                    starting_date,
                    end_date,
                    priority: priority || "High",
                    image_path,
                    status: "Ongoing"
                },
            )
            console.log(response.data);
            if(response.status===201) {
                setMessage("Project Added Successfully");
                setTimeout(()=>{
                    navigate('/projects');
                },3000)
            }
        } catch (error) {
            console.error("Full error object:", error);
            setMessage(
                error.response?.data?.message ||
                'Something Went Wrong'
            );
            console.log(error);
        }
    }
    return (
        <div className="add-project-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-wrapper">

                    <div className="form-container">

                        <h1>Add Project</h1>

                        <form onSubmit={addProjectFunc}>

                            <div className="input-group">
                                <label>Project Name</label>
                                <InputField
                                    type = 'text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e)=>{
                                        const newValue = e.target.value;
                                        setName(newValue);
                                    }}
                                />
                            </div>

                            <div className="input-group">
                                <label>Start Date</label>
                                <InputField
                                    type='date'
                                    value={starting_date}
                                    onChange={(e)=>setStartDate(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>End Date</label>
                                <InputField
                                    type='date'
                                    value={end_date}
                                    onChange={(e)=>setEndDate(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e)=>{
                                        const newMessage = e.target.value;
                                        setPriority(newMessage);
                                    }}
                                    required // ! so they have to select one
                                >
                                    <option value="High">High</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>


                            <div className="input-group">
                                <label>Project Image</label>
                                <InputField 
                                    type="file" 
                                    onChange={(e)=>{
                                        const file = e.target.files[0];
                                        const name = file.name;
                                        setImagePath(name);
                                    }}
                                />
                            </div>
                            

                            <button 
                                type="submit" 
                                className="submit-btn"
                            >
                                Add Project
                            </button>
                            
                            <p>{message}</p>
                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddProjects;