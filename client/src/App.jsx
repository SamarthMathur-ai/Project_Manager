import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import AuthLayout from "./components/AuthLayout";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Addmembers from "./pages/Addmembers";
import AddProjects from "./pages/AddProject";
import ProjectDetails from "./pages/ProjectDetails";
import AddSubtask from "./pages/AddSubtask";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        
        {/* Login Page */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
           path="/about"
           element={<About />}
       />
       <Route
          path="/team"
          element={<Team />}
        />
        <Route 
        path="/Addmembers" 
        element={<Addmembers />}
         />

        <Route
        path="/projects"
        element={<Projects />}
        />
        <Route
        path="/AddProject"
        element={<AddProjects />}
        />
        <Route 
        path="/project/:id"
         element={<ProjectDetails />}
          />

        <Route 
        path="/project/:id/add-subtask"
         element={<AddSubtask />} 
         />



      </Routes>
        
    </BrowserRouter>
  );
}

export default App;