import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ! We need useParams hook to grab the ID that React Router captured from the URL
import { Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { fetchSubtasks, deleteSubtasks, manifestTeamMembers, manifestAssignedMemb, addMemberSubTask, delMemberSubTask, chngSubStatus, chngProjStatus } from "../api/services/projectService.js";
import "./ProjectDetails.css";

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    // FIX: backend returns project fields FLAT on the object (no "project" wrapper),
    // and the subtasks array is attached as "subTasks" (capital T) — matched here.
    const [data, setData] = useState({ subTasks: [] });
    const [loading, setLoading] = useState(true);
    const [teammates, setTeammate] = useState([]);
    const [assigned, setAssigned] = useState([]);
    
   

    useEffect(()=> {
        const getSubProjects = async()=>{
            try {
                setLoading(true);
                const respProjSubTask = await fetchSubtasks(id);
                const respTeamMember = await manifestTeamMembers();
                
                console.log(respTeamMember.data);
                console.log(respProjSubTask.data);
                
                setData(respProjSubTask.data); // data.name, data.priority, ... and data.subTasks
                setTeammate(respTeamMember.data);
                
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false);
            }
        }
        getSubProjects();
    }, [id])

    

    const [openDropdown, setOpenDropdown] = useState(null);

   

    // FIX: update subTasks in place instead of overwriting the whole data object,
    // and filter on subtask_id (that's what's passed in from the onClick).
    const deleteSubtask = async (id) => {

        try {
            setData(prev => ({
                ...prev,
                subTasks: prev.subTasks.filter(task => task.subtask_id !== id)
            }));
    
            const response = await deleteSubtasks(id);
            console.log(response)
            console.log("Successfully deleted")
        } catch (error) {
            console.log(error);
            console.log("Not successfully deleted")
        }
    }


    const fetchAssigned = async (subTaskId) => {
        try {
            const respAssigned = await manifestAssignedMemb(subTaskId);
            console.log(respAssigned.data);
            setAssigned(Array.isArray(respAssigned.data) ? respAssigned.data : []);
        } catch (error) {
            console.log(error);
            console.log("Something Went Wrong");
            setAssigned([]);
        }
    }


    const addMembSub = async (subTaskId,membId) => {
        try {
            const affixMembSub = await addMemberSubTask(subTaskId, membId);
            console.log(affixMembSub.data);
        } catch (error) {
            console.log(error);
            console.log("Something Went Wrong");
        }
    }

    const delMembSub = async (subTaskId,membId) => {
        try {
            const expungeMembSub = await delMemberSubTask(subTaskId, membId);
            console.log(expungeMembSub.data);
        } catch (error) {
            console.log(error);
            console.log("Something Went Wrong");
        }
    }

    const toggleMember = async (subTaskId, memberId, isChecked) => {
        if (isChecked) {
            setAssigned(prev => [...prev, {team_member_id: memberId}]);
            await addMembSub(subTaskId, memberId);
        } else {
            setAssigned(prev => prev.filter(a => a.team_member_id!=memberId));
            await delMembSub(subTaskId, memberId);
        }
    }


    const handleStatusChange = async (subTaskId, newStatus) => {
        try {
            
            setData(prev => ({
                ...prev,
                subTasks: prev.subTasks.map(st=>
                    st.subtask_id === subTaskId ? { ...st, status: newStatus } : st // * everywhere we are putting the already status in a variable and keeping it.
                )
        }));
    
           
            await chngSubStatus(subTaskId, newStatus);
        } catch (error) {
            console.error("Failed to update status:", error);
            
        }
    };

    const handleProjStatus = async (projId, newStatus) => {
        try {
            setData(prev => ({
                ...prev,
                project: {
                    ...prev.project,
                    status: newStatus
                }
            }))
            await chngProjStatus(projId, newStatus)
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }



    if(loading) {
        return (
          <div className="project-details-page">
            <Sidebar />
            <div className="PD-main">
              <div style={{ padding: "50px", textAlign: "center" }}>Loading your projects...</div>
            </div>
          </div> 
        );
    }

    return (

        <div className="project-details-page">

            <Sidebar />

            <div className="PD-main">

                <Navbar />

                <div className="PD-content">

                    <h1>{data.project.name}</h1>

                    {/* PROJECT INFO */}

                    <table className="project-info-table">

                        <thead>
                            <tr>
                                <th>{data.project.status}</th>
                                <th>Priority</th>
                                <th>Starting Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>

                                <td>

                                    <select
                                        value={data.project.status}
                                        onChange={(e) => handleProjStatus(data.project.id, e.target.value)}
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                    </select>

                                </td>

                                <td>{data.project.priority}</td>

                                <td>{data.project.starting_date}</td>

                                <td>{data.project.end_date}</td>

                            </tr>

                        </tbody>

                    </table>


                    <h2>SUBTASKS</h2>

                    <table className="subtask-table">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Task</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Status</th>
                                <th>Members</th>
                                <th>Delete</th>

                            </tr>

                        </thead>

                        <tbody>

                            {data?.subTasks?.map((subtask) => (

                                <tr key={subtask.subtask_id}>

                                    <td>{subtask.subtask_name}</td>

                                    <td>{subtask.task_name}</td>

                                    <td>{subtask.start_date}</td>

                                    <td>{subtask.end_date}</td>

                                    <td>

                                        <select
                                            value={subtask.status}
                                            onChange={(e)=>handleStatusChange(subtask.subtask_id, e.target.value)}
                                        >
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Completed">Completed</option>
                                        </select>

                                    </td>

                                    <td>

                                        <button
                                            className="member-btn"
                                            onClick={() => {
                                                fetchAssigned(subtask.subtask_id);
                                                setOpenDropdown(
                                                    openDropdown === subtask.subtask_id
                                                        ? null
                                                        : subtask.subtask_id
                                                )
                                            }
                                                
                                            }
                                        >
                                            + Members
                                        </button>

                                        {

                                            openDropdown === subtask.subtask_id && (
                                                <div className="member-dropdown">
                                                    {
                                                         teammates.map(member => (
                                                            <label key={member.id}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        assigned.some(
                                                                            a => a.team_member_id === member.id
                                                                        )
                                                                    }
                                                                    onChange={(e) => toggleMember( subtask.subtask_id, member.id, e.target.checked)}
                                                                />
                                                                {member.name}
                                                            </label>
                                                        ))
                                                    }
                                                </div>//             //         type="checkbox"
         

                                            )

                                        }

                                        <div className="member-pills">

                                            {

                                                subtask.members?.map(member => (

                                                    <span
                                                        className="pill"
                                                        key={member}
                                                    >
                                                        {member}
                                                    </span>

                                                ))

                                            }

                                        </div>

                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteSubtask(subtask.subtask_id)
                                            }
                                        >
                                            <Trash2 size={18}/>
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <button
                        className="PD-add-btn"
                        onClick={() =>
                            navigate(`/project/${id}/add-subtask`)
                        }
                    >
                        + Add Subtask
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProjectDetails;