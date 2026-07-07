import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMember } from "../api/services/teamService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Addmembers.css";

function Addmembers() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        linkedin_link: "",
        image_path: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addMember(formData);

            alert("Member Added Successfully!");

            navigate("/team");

        } catch (error) {
            console.error(error);
            alert("Failed to add member.");
        }
    };

    return (
        <div className="add-member-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-content">

                    <div className="form-container">

                        <h1>Add Team Member</h1>

                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter member name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Enter role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>LinkedIn Profile</label>
                                <input
                                    type="url"
                                    name="linkedin_link"
                                    placeholder="Paste LinkedIn URL"
                                    value={formData.linkedin_link}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Profile Image URL</label>
                                <input
                                    type="text"
                                    name="image_path"
                                    placeholder="Paste image URL"
                                    value={formData.image_path}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                            >
                                Add Member
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Addmembers;