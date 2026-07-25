import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./AddProject.css";
import { useState } from "react";
import api from "../api/axios.js";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

function AddProjects() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [starting_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [priority, setPriority] = useState("");
    const [image_path] = useState("default-project-avatar.jpg");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    // ---------------- Validation ----------------

    const validate = () => {
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Project name is required";
        }

        if (!starting_date) {
            newErrors.starting_date = "Starting date is required";
        }

        if (!end_date) {
            newErrors.end_date = "End date is required";
        }

        if (
            starting_date &&
            end_date &&
            new Date(end_date) < new Date(starting_date)
        ) {
            newErrors.end_date =
                "End date cannot be earlier than the starting date";
        }

        if (!priority) {
            newErrors.priority = "Please select a project priority";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // ---------------- Submit ----------------

    const addProjectFunc = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await api.post(
                "/api/projectPage/addProject",
                {
                    name,
                    starting_date,
                    end_date,
                    priority,
                    image_path,
                    status: "Ongoing",
                }
            );

            console.log(response.data);

            if (response.status === 201) {
                setMessage("Project Added Successfully");

                setTimeout(() => {
                    navigate("/projects");
                }, 3000);
            }
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Something Went Wrong"
            );
        }
    };

    return (
        <div className="add-project-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-wrapper">

                    <div className="form-container">

                        <h1>Add Project</h1>

                        <form onSubmit={addProjectFunc}>

                            {/* Project Name */}

                            <div className="input-group">

                                <label>Project Name</label>

                                <InputField
                                    type="text"
                                    placeholder="Project Name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);

                                        setErrors({
                                            ...errors,
                                            name: ""
                                        });
                                    }}
                                />

                                {errors.name && (
                                    <p className="error">{errors.name}</p>
                                )}

                            </div>

                            {/* Start Date */}

                            <div className="input-group">

                                <label>Start Date</label>

                                <InputField
                                    type="date"
                                    value={starting_date}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);

                                        setErrors({
                                            ...errors,
                                            starting_date: ""
                                        });
                                    }}
                                />

                                {errors.starting_date && (
                                    <p className="error">
                                        {errors.starting_date}
                                    </p>
                                )}

                            </div>

                            {/* End Date */}

                            <div className="input-group">

                                <label>End Date</label>

                                <InputField
                                    type="date"
                                    value={end_date}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);

                                        setErrors({
                                            ...errors,
                                            end_date: ""
                                        });
                                    }}
                                />

                                {errors.end_date && (
                                    <p className="error">
                                        {errors.end_date}
                                    </p>
                                )}

                            </div>

                            {/* Priority */}

                            <div className="input-group">

                                <label>Priority</label>

                                <select
                                    value={priority}
                                    onChange={(e) => {
                                        setPriority(e.target.value);

                                        setErrors({
                                            ...errors,
                                            priority: ""
                                        });
                                    }}
                                >
                                    <option value="">
                                        Select Priority
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                    <option value="Mid">
                                        Mid
                                    </option>

                                    <option value="Low">
                                        Low
                                    </option>

                                </select>

                                {errors.priority && (
                                    <p className="error">
                                        {errors.priority}
                                    </p>
                                )}

                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                            >
                                Add Project
                            </button>

                            {message && <p>{message}</p>}

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddProjects;