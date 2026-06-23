import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Addmembers.css";

function Addmembers() {
    return (
        <div className="add-member-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-content">

                    <div className="form-container">

                        <h1>Add Team Member</h1>

                        <form>

                            <div className="input-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter member name"
                                />
                            </div>

                            <div className="input-group">
                                <label>Role</label>
                                <input
                                    type="text"
                                    placeholder="Enter role"
                                />
                            </div>

                            <div className="input-group">
                                <label>LinkedIn Profile</label>
                                <input
                                    type="url"
                                    placeholder="Paste LinkedIn URL"
                                />
                            </div>

                            <div className="input-group">
                                <label>Profile Image</label>
                                <input type="file" />
                            </div>

                            <button className="submit-btn">
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