import React, { useState, useEffect } from "react";
import { getTasklist, addTask } from "../action/userAction.js"; 
import { useParams } from "react-router-dom";

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [description, setdescription] = useState({ description: "" });
    const { userId } = useParams();
    const cId = localStorage.getItem("cToken"); // ✅ Corrected localStorage retrieval

    useEffect(() => {
        if (userId) {
            fetchTaskDetails();
        } else {
            console.error("No userId found in route params.");
        }
    }, [userId]); 

    const fetchTaskDetails = async () => {
        try {
            if (!userId) return; 
            const data = await getTasklist(userId);
            if (data?.error) {
                console.error("Error:", data.error);
            } else {
                setTasks(data.tasks || []);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async () => {
        try {
            const response = await addTask(userId, description, cId); // ✅ Pass correct parameters

            if (response?.status) {
                setShowForm(false);
                setdescription({ description: "" }); // ✅ Clear input correctly
                fetchTaskDetails(); 
            } else {
                console.error("Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="flex flex-col p-6">
            {/* Add Task Button */}
            <button 
                className="btn btn-primary w-40 mb-4" 
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Cancel" : "Add Task"}
            </button>

            {/* Task Form */}
            {showForm && (
                <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
                    <textarea 
                        placeholder="Task Description" 
                        value={description.description} // ✅ Fix value binding
                        onChange={(e) => setdescription({ description: e.target.value })} // ✅ Fix onChange handler
                        className="textarea textarea-bordered w-full mb-2"
                    />
                    <button className="btn btn-success w-full" onClick={handleAddTask}>
                        Save Task
                    </button>
                </div>
            )}

            {/* Task List */}
            <div className="flex flex-wrap gap-4">
                {tasks.length > 0 ? (
                    tasks.map((item, index) => (
                        <div key={item._id} className={`card w-96 bg-base-100 shadow-sm ${item.completed ? "opacity-75" : ""}`}>
                            <div className="card-body">
                                <h2 className="card-title">Task {index + 1}</h2> 
                                <p>{item.description || "No description available"}</p>
                                <p className={`font-bold ${item.completed ? "text-green-600" : "text-red-600"}`}>
                                    {item.completed ? "Completed" : "Not Completed"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewTask;
