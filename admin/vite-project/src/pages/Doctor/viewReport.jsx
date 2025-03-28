// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../../context/AppContext";
// import { getReportsByUserId } from "../../actionDoctor"; // Import the action

// const DoctorDashboardReports = () => {
//   const { userId } = useParams();
//   const [values, setValues] = useState({ reports: [] });
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
   
//     if (userId) {
//       loadReportDetails();
//     }
//   }, [userId]); // ✅ Ensure data updates when userId changes

//   const loadReportDetails = async () => {
//     setLoading(true); // ✅ Start loading
//     try {
//       const data = await getReportsByUserId(userId);
//       //(data);
//       if (data.success) {
//         setValues(prev => ({ ...prev, reports: data.reports })); // ✅ Functional state update
//         setErrorMessage(""); // ✅ Clear previous errors
//       } else {
//         setValues(prev => ({ ...prev, reports: [] }));
//         setErrorMessage(data.error || "No reports available.");
//       }
//     } catch (error) {
//       setErrorMessage("Something went wrong while fetching reports.");
//     } finally {
//       setLoading(false); // ✅ Stop loading after fetching data
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-lg font-semibold mb-4">Patient Reports</h2>

//       {loading ? (
//         <p>Loading reports...</p>
//       ) : errorMessage ? (
//         <p className="text-red-500">{errorMessage}</p>
//       ) : values.reports.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {values.reports.map((report, index) => (
//             <div key={index} className="bg-white p-4 border rounded-lg shadow-md">
//               <p><strong>Symptoms:</strong> {report.symptoms}</p>
//               <p><strong>Duration:</strong> {report.duration}</p>
//               <p><strong>Pain Level:</strong> {report.painLevel}</p>
//               <p><strong>Body Temperature:</strong> {report.bodyTemperature}°C</p>
//               <p><strong>Blood Pressure:</strong> {report.bloodPressure}</p>
//               <p><strong>Existing Conditions:</strong> {report.existingConditions}</p>
//               <p><strong>Medications:</strong> {report.medications}</p>
//               <p><strong>Additional Notes:</strong> {report.additionalNotes}</p>
//               <p><strong>Appointment Date:</strong> {report.appointmentDate}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No reports found for this user.</p>
//       )}
//     </div>
//   );
// };

// export default DoctorDashboardReports;


//chatgpt
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportsByUserId } from "../../actionDoctor";

const DoctorDashboardReports = () => {
  const { userId } = useParams();

  const [values, setValues] = useState({ reports: [] });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadReportDetails();
  }, []);

  const loadReportDetails = () => {
    getReportsByUserId(userId).then((data) => {
      if (data.success) {
        setValues({ reports: data.reports });
        setLoading(false);
      } else {
        setErrorMessage("Failed to fetch reports.");
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
        {/* Stepper Header */}
        <div className="flex justify-between border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold">Patient Reports</h2>
          <div className="flex space-x-4 text-gray-500">
            <span className="font-semibold text-blue-600">1. Reports</span>
            <span>2. Diagnosis</span>
            <span>3. Treatment</span>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-600">Loading reports...</p>
        ) : errorMessage ? (
          <p className="text-center text-red-500">{errorMessage}</p>
        ) : values.reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.reports.map((report, index) => (
              <div key={index} className="bg-gray-50 p-4 border rounded-lg shadow-md">
                <p><strong>Symptoms:</strong> {report.symptoms}</p>
                <p><strong>Duration:</strong> {report.duration}</p>
                <p><strong>Pain Level:</strong> {report.painLevel}</p>
                <p><strong>Body Temperature:</strong> {report.bodyTemperature}°C</p>
                <p><strong>Blood Pressure:</strong> {report.bloodPressure}</p>
                <p><strong>Existing Conditions:</strong> {report.existingConditions}</p>
                <p><strong>Medications:</strong> {report.medications}</p>
                <p><strong>Additional Notes:</strong> {report.additionalNotes}</p>
                <p><strong>Appointment Date:</strong> {report.appointmentDate}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reports found for this user.</p>
        )}

        {/* Next Step Button */}
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardReports;
