import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Info,
  Users,
  ArrowLeft
} from "lucide-react";
import "./Sidebar.css";
function Sidebar() {

    const location = useLocation();

    const hideSidebar =
        location.pathname === "/login" ||
        location.pathname === "/signup";

    if (hideSidebar) {
        return null;
    }
    const showBackButton =
        location.pathname === "/Addmembers" ||
        location.pathname === "/AddProject" ||
        location.pathname.startsWith("/project/");
    return (
        <div className="sidebar">

            <div className="logo">
                <h4>ProjectHub</h4>
            </div>

            <div className="sidebar-icons">

                <Link to="/dashboard" className="icon-container">
                    <LayoutDashboard size={28}/>
                    <span className="tooltip">Dashboard</span>
                </Link>

                <Link to="/projects" className="icon-container">
                    <ClipboardList size={28}/>
                    <span className="tooltip">Projects</span>
                </Link>

                <Link to="/about" className="icon-container">
                    <Info size={28}/>
                    <span className="tooltip">About</span>
                </Link>

                <Link to="/team" className="icon-container">
                    <Users size={28}/>
                    <span className="tooltip">Team</span>
                </Link>

            </div>

            {showBackButton && (

                <Link to="/dashboard" className="back-icon">

                    <ArrowLeft size={28}/>

                    <span className="tooltip">Back</span>

                </Link>

            )}

        </div>
    );
}

export default Sidebar;