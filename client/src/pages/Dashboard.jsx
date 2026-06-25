import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; // ! To check for the access token
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(()=> {
    const token = localStorage.getItem("accessToken");
    if(!token) {
      navigate("/")
    }
  },[navigate]) // ? [] so that it runs only once


  useEffect(() => {

    const testAPI = async () => {
        try {
            const response = await api.get("/api/projectPage/showProjects");
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    testAPI();

}, []);


  const ongoingProjects = [
    {
      title: "Website Redesign",
      due: "15 June",
      team: "Frontend Team",
      priority: "Medium"
    },
    {
      title: "Mobile App",
      due: "22 June",
      team: "Backend Team",
      priority: "Low"
    }
  ];

  const attentionProjects = [
    {
      title: "API Integration",
      due: "10 June",
      team: "DevOps Team",
      priority: "High"
    },
    {
      title: "Testing",
      due: "12 June",
      team: "QA Team",
      priority: "Critical"
    }
  ];

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="content">

          <h1>Dashboard</h1>

          {/* Statistics Cards */}

          <div className="cards">

            <div className="card total">
              <h3>Total Projects</h3>
              <p>24</p>
            </div>

            <div className="card completed">
              <h3>Completed</h3>
              <p>18</p>
            </div>

            <div className="card attention">
              <h3>Attention Needed</h3>
              <p>6</p>
            </div>

          </div>

          {/* Projects Section */}

          <div className="dashboard-projects-section">

            {/* Ongoing Projects */}

            <div className="dashboard-project-column">

              <h2>Ongoing Projects</h2>

              {ongoingProjects.map((project, index) => (

                <div
                  className="dashboard-project-card dashboard-ongoing-card"
                  key={index}
                >

                  <div className="dashboard-project-header dashboard-ongoing-header">

                    <h3>{project.title}</h3>

                  </div>

                  <div className="dashboard-project-info">

                    <p>
                      <strong>Due:</strong> {project.due}
                    </p>

                    <p>
                      <strong>Team:</strong> {project.team}
                    </p>

                    <p>
                      <strong>Priority:</strong> {project.priority}
                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* Attention Needed */}

            <div className="dashboard-project-column">

              <h2>Attention Needed</h2>

              {attentionProjects.map((project, index) => (

                <div
                  className="dashboard-project-card dashboard-attention-card"
                  key={index}
                >

                  <div className="dashboard-project-header dashboard-attention-header">

                    <h3>{project.title}</h3>

                  </div>

                  <div className="dashboard-project-info">

                    <p>
                      <strong>Due:</strong> {project.due}
                    </p>

                    <p>
                      <strong>Team:</strong> {project.team}
                    </p>

                    <p>
                      <strong>Priority:</strong> {project.priority}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;