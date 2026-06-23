import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Team.css";
import { Plus } from "lucide-react";

function Team() {

    const members = [
        {
            id: 1,
            name: "Samarth Mathur",
            role: "Frontend Developer",
            linkedin: "https://linkedin.com",
            image: "https://ui-avatars.com/api/?name=Samarth+Mathur&background=4f46e5&color=fff"
        },
        {
            id: 2,
            name: "Manasvi Panwar",
            role: "Backend Developer",
            linkedin: "https://linkedin.com",
            image: "https://ui-avatars.com/api/?name=Manasvi+Panwar&background=0891b2&color=fff"
        }
    ];

    return (
        <div className="team-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="team-content">

                    <div className="team-header">

                        <h1>Team Members</h1>

                        <button className="add-member-btn">
                            <Plus size={20} />
                            Add Member
                        </button>

                    </div>

                    <div className="members-container">

                        {members.map(member => (

                            <div className="member-card" key={member.id}>

                                <div className="member-top">

                                    <div className="member-image">
                                        <img src={member.image} alt="" />
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
                                            <a href={member.linkedin}>
                                                {member.linkedin}
                                            </a>
                                        </div>

                                    </div>

                                </div>

                             

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Team;