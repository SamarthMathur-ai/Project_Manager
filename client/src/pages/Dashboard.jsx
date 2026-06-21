import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {

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

          {/* Project Sections */}

          <div className="projects-section">

            {/* Ongoing Projects */}

            <div className="project-column">

              <h2>Ongoing Projects</h2>

              {ongoingProjects.map((project, index) => (

                <div className="project-card ongoing-card" key={index}>

                  <div className="project-header ongoing-header">
                    <h3>{project.title}</h3>
                  </div>

                  <div className="project-info">

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

            <div className="project-column">

              <h2>Attention Needed</h2>

              {attentionProjects.map((project, index) => (

                <div className="project-card attention-card" key={index}>

                  <div className="project-header attention-header">
                    <h3>{project.title}</h3>
                  </div>

                  <div className="project-info">

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