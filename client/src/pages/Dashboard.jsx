import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
    getTotalProjects,
    getCompletedProjects,
    getAttentionProjects,
    getOngoingProjects,
    getAttentionProjectsList
} from "../api/services/dashboardService";

function Dashboard() {
    const navigate = useNavigate();

    // Authentication Check
    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    // States
    const [totalProjects, setTotalProjects] = useState(0);
    const [completedProjects, setCompletedProjects] = useState(0);
    const [attentionProjectsCount, setAttentionProjectsCount] = useState(0);

    const [ongoingProjects, setOngoingProjects] = useState([]);
    const [attentionProjects, setAttentionProjects] = useState([]);

    // Fetch Dashboard Data
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [
                    total,
                    completed,
                    attention,
                    ongoing,
                    attentionList
                ] = await Promise.all([
                    getTotalProjects(),
                    getCompletedProjects(),
                    getAttentionProjects(),
                    getOngoingProjects(),
                    getAttentionProjectsList()
                ]);

                setTotalProjects(total.data.ans);
                setCompletedProjects(completed.data.ans);

                // Ongoing Projects
                setOngoingProjects(ongoing.data);

                // Filter only ongoing projects for Attention Needed
                const filteredAttention = attentionList.data.filter(
                    (project) => project.status === "Ongoing"
                );

                setAttentionProjects(filteredAttention);

                // Count only ongoing attention projects
                setAttentionProjectsCount(filteredAttention.length);

            } catch (err) {
                console.log(err);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div className="dashboard">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="content">

                    <h1>Dashboard</h1>

                    {/* Statistics */}

                    <div className="cards">

                        <div className="card total">
                            <h3>Total Projects</h3>
                            <p>{totalProjects}</p>
                        </div>

                        <div className="card completed">
                            <h3>Completed</h3>
                            <p>{completedProjects}</p>
                        </div>

                        <div className="card attention">
                            <h3>Attention Needed</h3>
                            <p>{attentionProjectsCount}</p>
                        </div>

                    </div>

                    {/* Projects */}

                    <div className="dashboard-projects-section">

                        {/* Ongoing */}

                        <div className="dashboard-project-column">

                            <h2>Ongoing Projects</h2>

                            {ongoingProjects.length === 0 ? (
                                <p>No Ongoing Projects</p>
                            ) : (
                                ongoingProjects.map((project) => (

                                    <div
                                        className="dashboard-project-card dashboard-ongoing-card"
                                        key={project.id}
                                    >

                                        <div className="dashboard-project-header dashboard-ongoing-header">
                                            <h3>{project.name}</h3>
                                        </div>

                                        <div className="dashboard-project-info">

                                            <p>
                                                <strong>Due:</strong>{" "}
                                                {new Date(project.end_date).toLocaleDateString()}
                                            </p>

                                            <p>
                                                <strong>Status:</strong>{" "}
                                                {project.status}
                                            </p>

                                            <p>
                                                <strong>Priority:</strong>{" "}
                                                {project.priority}
                                            </p>

                                        </div>

                                    </div>

                                ))
                            )}

                        </div>

                        {/* Attention Needed */}

                        <div className="dashboard-project-column">

                            <h2>Attention Needed</h2>

                            {attentionProjects.length === 0 ? (
                                <p>No Projects Need Attention</p>
                            ) : (
                                attentionProjects.map((project) => (

                                    <div
                                        className="dashboard-project-card dashboard-attention-card"
                                        key={project.id}
                                    >

                                        <div className="dashboard-project-header dashboard-attention-header">
                                            <h3>{project.name}</h3>
                                        </div>

                                        <div className="dashboard-project-info">

                                            <p>
                                                <strong>Due:</strong>{" "}
                                                {new Date(project.end_date).toLocaleDateString()}
                                            </p>

                                            <p>
                                                <strong>Status:</strong>{" "}
                                                {project.status}
                                            </p>

                                            <p>
                                                <strong>Priority:</strong>{" "}
                                                {project.priority}
                                            </p>

                                        </div>

                                    </div>

                                ))
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;