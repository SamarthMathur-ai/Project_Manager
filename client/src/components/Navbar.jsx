import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  if (hideNavbar) return null;

  return (
    <nav className="navbar">
    <div className="nav-right">

        <div className="user-info">
            <img
                src="https://ui-avatars.com/api/?name=Samarth+Mathur&background=4f46e5&color=fff"
                alt="profile"
                className="profile-pic"
            />

            <span>Samarth Mathur</span>
        </div>

        <button className="signup-btn">
            Sign Up
        </button>

    </div>
</nav>
  );
}

export default Navbar;