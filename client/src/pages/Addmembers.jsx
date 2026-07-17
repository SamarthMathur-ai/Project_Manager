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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Remove error while typing
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.role.trim()) {
            newErrors.role = "Role is required";
        }

        if (!formData.linkedin_link.trim()) {
            newErrors.linkedin_link = "LinkedIn URL is required";
        } else {
            const regex =
                /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?$/;

            if (!regex.test(formData.linkedin_link)) {
                newErrors.linkedin_link =
                    newErrors.linkedin_link =
  
    "Enter a valid LinkedIn profile URL. The link should start with https://";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await addMember(formData);

            alert("Member added successfully!");

            navigate("/team");
        } catch (err) {
            console.log(err);

            if (
                err.response?.data?.error?.includes("Duplicate entry")
            ) {
                setErrors({
                    linkedin_link:
                        "This LinkedIn profile already exists."
                });
            } else {
                alert("Failed to add member.");
            }
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
                                />

                                {errors.name && (
                                    <p className="error">{errors.name}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <label>Role</label>

                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Enter role"
                                    value={formData.role}
                                    onChange={handleChange}
                                />

                                {errors.role && (
                                    <p className="error">{errors.role}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <label>LinkedIn Profile</label>

                                <input
                                    type="text"
                                    name="linkedin_link"
                                    placeholder="https://www.linkedin.com/in/username"
                                    value={formData.linkedin_link}
                                    onChange={handleChange}
                                />

                                {errors.linkedin_link && (
                                    <p className="error">
                                        {errors.linkedin_link}
                                    </p>
                                )}
                            </div>

                            <div className="input-group">
                                <label>Profile Image URL</label>

                                <input
                                    type="text"
                                    name="image_path"
                                    placeholder="Enter image URL (optional)"
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