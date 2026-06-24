import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Project.css";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Website Redesign",
      due: "15 Jul",
      team: "Frontend",
      priority: "High Priority",
      color: "#f2e1c5",
      image: "https://cdn-icons-png.flaticon.com/512/2881/2881142.png",
      status: "Active",
    },
    {
      id: 2,
      title: "Web Development",
      due: "20 Jul",
      team: "UI Team",
      priority: "High Priority",
      color: "#f2e1c5",
      image: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
      status: "Completed",
    },
    {
      id: 3,
      title: "Backend",
      due: "25 Jul",
      team: "Backend",
      priority: "High Priority",
      color: "#cfe1ea",
      image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      status: "Active",
    },
    {
      id: 4,
      title: "AI/ML Project",
      due: "30 Jul",
      team: "Backend",
      priority: "High Priority",
      color: "#cfe1ea",
      image: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
      status: "Overdue",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.status === activeFilter);

  return (
    <div className="project-page">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="project-content">
          <div className="project-header">
            <h1>Projects</h1>

            <button className="add-project-btn"
             onClick={() => navigate("/AddProject")}>
              <Plus size={20} />
              Add Project
            </button>
          </div>

          {/* Search */}
          <div className="search-container">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search" />
            </div>
          </div>

          {/* Filters */}
          <h2 className="filter-title">Filters</h2>

          <div className="filters">
            {["All", "Active", "Completed", "Overdue"].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${
                  activeFilter === filter ? "active-filter" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div
                className="project-card"
                key={project.id}
                style={{ backgroundColor: project.color }}
                 onClick={() => navigate(`/project/${project.id}`)}
              >
                <div>
                  <h2>{project.title}</h2>

                  <p>Due: {project.due}</p>
                  <p>Team: {project.team}</p>
                  <p>{project.priority}</p>
                </div>

                <img src={project.image} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;