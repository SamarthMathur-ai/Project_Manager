import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./ProjectDetails.css";

function ProjectDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [projectStatus, setProjectStatus] = useState("Ongoing");

    const teamMembers = [
        "Samarth Mathur",
        "Manasvi Panwar"
    ];

    const [openDropdown, setOpenDropdown] = useState(null);

    const [subtasks, setSubtasks] = useState([
        {
            id: 1,
            name: "Wireframes",
            task: "UI Design",
            start: "01-07-2026",
            end: "05-07-2026",
            status: "Ongoing",
            members: ["Samarth Mathur"]
        },
        {
            id: 2,
            name: "API Setup",
            task: "Backend",
            start: "06-07-2026",
            end: "10-07-2026",
            status: "Completed",
            members: ["Samarth Mathur", "Manasvi Panwar"]
        },
        {
            id: 3,
            name: "Testing",
            task: "QA",
            start: "11-07-2026",
            end: "15-07-2026",
            status: "Ongoing",
            members: ["Manasvi Panwar"]
        }
    ]);

    function deleteSubtask(id) {

        setSubtasks(
            subtasks.filter(task => task.id !== id)
        );

    }

    function updateStatus(index, value) {

        const updated = [...subtasks];

        updated[index].status = value;

        setSubtasks(updated);

    }

    function toggleMember(taskId, member) {

        const updated = subtasks.map(task => {

            if (task.id !== taskId) return task;

            if (task.members.includes(member)) {

                return {
                    ...task,
                    members: task.members.filter(
                        m => m !== member
                    )
                };

            }

            return {
                ...task,
                members: [...task.members, member]
            };

        });

        setSubtasks(updated);

    }

    return (

        <div className="project-details-page">

            <Sidebar />

            <div className="PD-main">

                <Navbar />

                <div className="PD-content">

                    <h1>PROJECT : Website Redesign</h1>

                    {/* PROJECT INFO */}

                    <table className="project-info-table">

                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>

                                <td>

                                    <select
                                        value={projectStatus}
                                        onChange={(e) =>
                                            setProjectStatus(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option>Ongoing</option>
                                        <option>Completed</option>
                                    </select>

                                </td>

                                <td>High</td>

                                <td>01-06-2026</td>

                                <td>31-08-2026</td>

                            </tr>

                        </tbody>

                    </table>


                    <h2>SUBTASKS</h2>

                    <table className="subtask-table">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Task</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Status</th>
                                <th>Members</th>
                                <th>Delete</th>

                            </tr>

                        </thead>

                        <tbody>

                            {subtasks.map((task, index) => (

                                <tr key={task.id}>

                                    <td>{task.name}</td>

                                    <td>{task.task}</td>

                                    <td>{task.start}</td>

                                    <td>{task.end}</td>

                                    <td>

                                        <select
                                            value={task.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option>Ongoing</option>
                                            <option>Completed</option>
                                        </select>

                                    </td>

                                    <td>

                                        <button
                                            className="member-btn"
                                            onClick={() =>
                                                setOpenDropdown(
                                                    openDropdown === task.id
                                                        ? null
                                                        : task.id
                                                )
                                            }
                                        >
                                            + Members
                                        </button>

                                        {

                                            openDropdown === task.id && (

                                                <div className="member-dropdown">

                                                    {

                                                        teamMembers.map(member => (

                                                            <label key={member}>

                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        task.members.includes(member)
                                                                    }
                                                                    onChange={() =>
                                                                        toggleMember(
                                                                            task.id,
                                                                            member
                                                                        )
                                                                    }
                                                                />

                                                                {member}

                                                            </label>

                                                        ))

                                                    }

                                                </div>

                                            )

                                        }

                                        <div className="member-pills">

                                            {

                                                task.members.map(member => (

                                                    <span
                                                        className="pill"
                                                        key={member}
                                                    >
                                                        {member}
                                                    </span>

                                                ))

                                            }

                                        </div>

                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteSubtask(task.id)
                                            }
                                        >
                                            <Trash2 size={18}/>
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <button
                        className="PD-add-btn"
                        onClick={() =>
                            navigate(`/project/${id}/add-subtask`)
                        }
                    >
                        + Add Subtask
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProjectDetails;