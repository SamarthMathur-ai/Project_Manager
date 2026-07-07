import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="about-content">

          <h1>About ProjectHub</h1>

<div className="about-card">
  <h2>Our Mission</h2>

  <p>
    ProjectHub is a collaborative project management platform designed to
    simplify planning, tracking, and managing projects efficiently. It helps
    teams stay organized, improve productivity, and monitor progress in real
    time.
  </p>
</div>

{/* Key Features */}

<h2 className="section-heading">Key Features</h2>

<div className="features">

  <div className="feature-card">
    <h3>📁 Project Management</h3>
    <p>Create and organize projects with ease.</p>
  </div>

  <div className="feature-card">
    <h3>✅ Task Tracking</h3>
    <p>Monitor project progress and completion status.</p>
  </div>

  <div className="feature-card">
    <h3>👥 Team Collaboration</h3>
    <p>Manage teams and assign responsibilities efficiently.</p>
  </div>

  <div className="feature-card">
    <h3>📊 Dashboard Analytics</h3>
    <p>View project statistics and important updates.</p>
  </div>

  <div className="feature-card">
    <h3>⚡ Real-Time Updates</h3>
    <p>Stay informed with the latest project changes.</p>
  </div>

  <div className="feature-card">
    <h3>🔒 Secure Authentication</h3>
    <p>Login and signup system with protected routes.</p>
  </div>

</div>

{/* Tech Stack */}

<div className="tech-stack">

  <h2>Tech Stack</h2>

  <ul>
    <li>⚛️ React.js</li>
    <li>🎨 CSS3</li>
    <li>🟢 Node.js</li>
    <li>🚀 Express.js</li>
    <li>🟨 JavaScript</li>
    <li> 🐬 MySQL</li>
    <li>🔐 JWT Authentication</li>  
    <li>📡 Axios </li>
    <li>🐳 Docker</li>
    <li>🌿 Git</li> 
    <li>🐙 GitHub</li>
  </ul>

</div>

{/* Development Team */}

<div className="team-section">

  <h2>Development Team</h2>

  <div className="team-cards">

    <div className="member-card">
      <h3>Samarth Mathur</h3>
      <p>Backend Developer</p>
    </div>

    <div className="member-card">
      <h3>Manasvi Panwar</h3>
      <p>Frontend Developer</p>
    </div>

  </div>

</div>

          </div>

        </div>

      </div>

    
  );
}

export default About;
