const API = 'http://localhost:4000/api';

export const getReportsByUserId = (userId) => {
    let data = { userId };

    //("Phase 1: Preparing Request");
    //("Request Body: " + JSON.stringify(data));

    return fetch(`${API}/doctor/getReportsByUserId`, {  
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        //("Phase 2: Request Sent! Waiting for response...");
        return response.json();
    })
    .then(responseData => {
        //("Phase 3: Response Received: " + JSON.stringify(responseData));
        return responseData;
    })
    .catch(err => {
        console.error("API Error:", err);
        //("Phase 4: Error Occurred");
        return { success: false, error: "Failed to fetch reports." };
    });
};

//get user profile
export const getUserProfileById = (userId) => {
    let data = { userId };

    //("Phase 1: Preparing Request");
    //("Request Body: " + JSON.stringify(data));

    return fetch(`${API}/user/get-profileBYdoctor`, {  
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        //("Phase 2: Request Sent! Waiting for response...");
        return response.json();
    })
    .then(responseData => {
        //("Phase 3: Response Received: " + JSON.stringify(responseData));
        return responseData;
    })
    .catch(err => {
        console.error("API Error:", err);
        //("Phase 4: Error Occurred");
        return { success: false, error: "Failed to fetch reports." };
    });
};
// get the patient list
export const getPatientList = (cId) => {
    let data = { cId };

    //("Phase 1: Preparing Request");
    //("Request Body: " + JSON.stringify(data));

    return fetch(`${API}/careTaker/allPatientsWithCaretaker`, {  
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        //("Phase 2: Request Sent! Waiting for response...");
        return response.json();
    })
    .then(responseData => {
        //("Phase 3: Response Received: " + JSON.stringify(responseData));
        return responseData;
    })
    .catch(err => {
        console.error("API Error:", err);
        //("Phase 4: Error Occurred");
        return { success: false, error: "Failed to fetch reports." };
    });
};

