import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./AddSubtask.css";

function AddSubtask() {

    const { id } = useParams();

    return (
        <div className="add-subtask-page">

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="form-wrapper">

                    <div className="form-card">

                        <h1>Add Subtask</h1>
                        <p>Project ID: {id}</p>

                        <form>

                            <input type="text" placeholder="Subtask Name" />

                            <input type="text" placeholder="Task Name" />

                            <label>Start Date</label>
                            <input type="date" />

                            <label>End Date</label>
                            <input type="date" />

                            

                            <button type="submit">
                                Add Subtask
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddSubtask;