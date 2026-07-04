import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Project.css";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {fetchProjectsByFilter} from "../api/services/projectService.js"


function Project() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]); // Empty initiallly
  const [search, setSearch] = useState("");// * Upar vale me array the hence bracket here string hence "".ads
  const [loading, setLoading] = useState(true);
 

  // ! Fetch from backend
  useEffect(() => {
    const getProjects = async() => {
      try {
        setLoading(true);
        const response = await fetchProjectsByFilter(activeFilter); // Calls the /showProjects endpoint
        setProjects(response.data); // Assuming your baackend returns an array
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, [activeFilter]);
  // ! : By putting activeFilter in the brackets, you are telling React: "Whenever the user clicks a button and activeFilter changes, run this entire useEffect again."
  

  
  if (loading) {
    return (
      <div className="project-page">
        <Sidebar />
        <div className="main">
          <div style={{ padding: "50px", textAlign: "center" }}>Loading your projects...</div>
        </div>
      </div> 
    );
  }

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
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={search} // Connects input to the state
                onChange={(e) => setSearch(e.target.value)} // Updates state as you type
              />
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
            {projects
            .filter((project)=>
              project.name.toLowerCase().includes(search.toLowerCase())  // ! applying searchquery condition before we apply filter see how easy it becomes rather making another function.

            ).map((project) => (
              <div
                className="project-card"
                key={project.id}
                style={{ backgroundColor: project.color }}
                 onClick={() => navigate(`/project/${project.id}`)}
              >
                <div>
                  <h2>{project.name}</h2>

                  <p>Due: {project.end_date}</p>
                  <p>Status: {project.status}</p>
                  <p>{project.priority}</p>
                </div>

                <img src={project.image_path} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;