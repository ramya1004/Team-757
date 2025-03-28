const API = "http://localhost:4000/api";


export const careTakerList = () => {
    return fetch(`${API}/careTaker/careTakerList`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .catch(err => console.log("Error fetching caretaker list:", err));
};

export const addCareTaker = (cId, dToken, userId) => {
    return fetch(`${API}/careTaker/addPatientsWithCaretaker`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cId, dToken, userId })
    })
    .then(response => response.json())
    .catch(err => {
        console.error("Error in addCareTaker:", err);
        return { error: "Failed to assign caretaker." };
    });
};


export const PatientList = (cId) => {
    return fetch(`${API}/careTaker/allPatientsWithCaretaker`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cId })
    })
    .then(response => response.json())
    .catch(err => {
        console.error("Error fetching patient list:", err);
        return { error: "Failed to fetch patients." };
    });
};

export const getTasklist = (token) => {
    return fetch("http://localhost:4000/task/getTasks", { 
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .catch(err => {
        console.error("Error fetching task list:", err);
        return { error: "Failed to fetch tasks." };
    });
};


export const loadTaskDetails = (token) => {
    return fetch("http://localhost:4000/task/getTasks", { 
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    })
    .then(response => response.json())
    .catch(err => {
        console.error("Error in loadTaskDetails:", err);
        return { error: "Failed to fetch tasks." };
    });
};


export const markcompleted = (_id, completed) => {
    return fetch("http://localhost:4000/task/markCompleted", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id, completed })
    })
    .then(response => response.json())
    .catch(err => {
        console.error("Error updating task:", err);
        return { error: "Failed to update task." };
    });
};

// ✅ Export all functions
// export { getTasklist, loadTaskDetails, markcompleted };
