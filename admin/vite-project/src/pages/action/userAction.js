export const getTasklist = (userId) => {
    //(JSON.stringify(userId))
    return fetch('http://localhost:4000/task/taskByUserId', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId }) // ✅ Sending cId in request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response received:", data); // ✅ Debugging in console instead of //
        return data;
    })
    .catch(err => {
        console.error("Error in PatientList:", err);
        return { error: "Failed to fetch patients." }; // ✅ Graceful error handling
    });
};

//add task list
export const addTask = (userId, cId, description) => {
    console.log("Sending request with:", { userId, cId, description });

    return fetch('http://localhost:4000/task/addtask', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, description,cId }) // ✅ Sending userId & description in request body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response received:", data);
        return data;
    })
    .catch(err => {
        console.error("Error in addTask:", err);
        return { error: "Failed to add task." }; // ✅ Proper error handling
    });
};
