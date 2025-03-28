import { useState, useEffect } from "react";
import { PatientList } from "../../actions/caretakerAction.js";
import { useNavigate } from "react-router-dom";

const ViewPatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const cId = localStorage.getItem("cToken");

  useEffect(() => {
    if (cId) {
      loadPatientDetails();
    } else {
      console.error("No caretaker token found.");
    }
  }, [cId]);

  const loadPatientDetails = async () => {
    try {
      const data = await PatientList(cId);
      if (data?.error) {
        console.error("Error:", data.error);
      } else {
        setPatients(data.users);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleViewReport = (userId) => {
    navigate(`/viewProfile/${userId}`);  // ✅ Navigates to the correct route
  };
  const handleTask = (userId) => {
    navigate(`/viewTask/${userId}`);  // ✅ Navigates to the correct route
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Patient List</h2>

        <ul className="bg-base-100 rounded-box shadow-md mt-4">
          {patients.length > 0 ? (
            patients.map((item, index) => (
              <li key={item._id || index} className="flex items-center p-4 border-b">
                
                {/* Patient Section */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.userData?.image || "/default-avatar.png"}
                    alt={item.userData?.name || "Patient"}
                  />
                  <div>
                    <div className="font-semibold">{item.userData?.name || "Unknown"}</div>
                    <div className="text-xs text-gray-500">Patient</div>
                  </div>
                </div>

                {/* Doctor Section */}
                <div className="flex items-center gap-4 ml-8">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.docData?.image || "/default-doctor.png"}
                    alt={item.docData?.name || "Doctor"}
                  />
                  <div>
                    <div className="font-semibold">{item.docData?.name || "Unknown"}</div>
                    <div className="text-xs text-gray-500">Doctor</div>
                  </div>
                </div>

                {/* View Report Button */}
                <div className="ml-auto">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleViewReport(item.userData?._id)}
                  >
                    View Profile
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleTask(item.userData?._id)}
                  >
                   Task management
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No patients found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ViewPatientList;
