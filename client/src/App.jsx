import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import AuthLayout from "./components/AuthLayout";
import Team from "./pages/Team";
import Projects from "./pages/Projects";

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
        path="/projects"
        element={<Projects />}
        />


      </Routes>
        
    </BrowserRouter>
  );
}

export default App;