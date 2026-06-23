import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./AddProject.css";

function AddProjects() {
    return (
        <div className="add-project-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-wrapper">

                    <div className="form-container">

                        <h1>Add Project</h1>

                        <form>

                            <div className="input-group">
                                <label>Project Name</label>
                                <input type="text" placeholder="Enter project name" />
                            </div>

                            <div className="input-group">
                                <label>Start Date</label>
                                <input type="date" />
                            </div>

                            <div className="input-group">
                                <label>End Date</label>
                                <input type="date" />
                            </div>

                            <div className="input-group">
                                <label>Priority</label>
                                <select>
                                    <option value="High">High</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Project Image</label>
                                <input type="file" />
                            </div>

                            <button type="submit" className="submit-btn">
                                Add Project
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddProjects;