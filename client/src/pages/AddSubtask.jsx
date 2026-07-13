import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./AddSubtask.css";
import { useState } from "react";
import { useEffect } from "react";

function AddSubtask() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const getTasks = async()=>{
            setLoading(true)
            
        }
    })

    return (
        <div className="add-subtask-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-wrapper">

                    <div className="form-card">

                        <h1>Add Subtask</h1>
                        <p>Project ID: {id}</p>

                        <form>

                            <input type="text" placeholder="Subtask Name" />

                            <input type="text" placeholder="Task Name" />

                            <label>Start Date</label>
                            <input type="date" />

                            <label>End Date</label>
                            <input type="date" />

                            

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