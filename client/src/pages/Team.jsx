import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Team.css";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMembers } from "../api/services/teamService";

function Team() {
    const navigate = useNavigate();

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {

            const response = await getMembers();

            console.log("FULL RESPONSE");
            console.dir(response);

            console.log("RESPONSE DATA");
            console.dir(response.data);

            if (Array.isArray(response.data)) {
                 console.log("It's an array");
                setMembers(response.data);} 
           else {
                console.log("Not an array:", response.data);
    }

} catch (error) {
    console.error("Error fetching team members:", error);
}
        };

        fetchMembers();
    }, []);

    return (
        <div className="team-page">
            <Sidebar />

            <div className="main">
                <Navbar />

                <div className="team-content">
                    <div className="team-header">
                        <h1>Team Members</h1>

                        <button
                            className="add-member-btn"
                            onClick={() => navigate("/Addmembers")}
                        >
                            <Plus size={20} />
                            Add Member
                        </button>
                    </div>

                    <div className="members-container">
                        {members.length === 0 ? (
                            <h3>No Team Members Found</h3>
                        ) : (
                            members.map((member) => (
                                <div className="member-card" key={member.id}>
                                    <div className="member-top">
                                        <div className="member-image">
                                            <img src={
                                                 member.image_path
                                                  ? `/${member.image_path}`
                                                 : "/default-avatar.jpg"}
                                                 alt={member.name}
                                            />
                                        </div>

                                        <div className="member-details">
                                            <div>
                                                <h3>NAME:</h3>
                                                <p>{member.name}</p>
                                            </div>

                                            <div>
                                                <h3>ROLE:</h3>
                                                <p>{member.role}</p>
                                            </div>

                                            <div>
                                                <h3>LINKEDIN:</h3>
                                                <a
                                                    href={member.linkedin_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {member.linkedin_link}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;