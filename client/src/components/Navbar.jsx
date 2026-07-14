import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { name } from "../api/services/projectService";

import "./Navbar.css"

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name_user,setName] = useState("");

  const putUserName = async () => {
    try {
      const response = await name();
      console.log(response.data);
      setName(response.data.name)
    } catch (error) {
      console.log("Some Error")
      console.log(error)
    }
  }
  useEffect(() => {
    putUserName();
  }, []);


  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/signup";

  if (hideNavbar) return null;
  
  const logout = async ()=> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post(
        'http://localhost:3000/auth/userLogout',
        {
          refreshToken: refreshToken
        }
      )
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/");

      console.log(response.data)
    } catch (error) {
      console.log("Some Error")
      console.log(error)
    }
  }


  
  return (
    <nav className="navbar">
    <div className="nav-right">

        <div className="user-info">
            <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name_user)}&background=4f46e5&color=fff`}
                // ? Why?

                // ?"Samarth Mathur" → "Samarth%20Mathur"
                // ?"John O'Connor" → properly encoded too.
                // ?It works for any special characters, not just spaces.
                
                // ?This is the standard way to put user-provided text into a URL.
                alt="profile"
                className="profile-pic"
            />

            <span>{name_user || "Loading..."}</span>
        </div>

        <button className="signup-btn"
        onClick={logout}>
            Log Out
        </button>

    </div>
</nav>
  );
}

export default Navbar;