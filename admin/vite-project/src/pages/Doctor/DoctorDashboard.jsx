// import React from 'react'
// import { useContext } from 'react'
// import { useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'

// const DoctorDashboard = () => {

//   const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, currency } = useContext(AppContext)


//   useEffect(() => {

//     if (dToken) {
//       getDashData()
//     }

//   }, [dToken])

//   return dashData && (
//     <div className='m-5'>

//       <div className='flex flex-wrap gap-3'>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.earning_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
//             <p className='text-gray-400'>Earnings</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.appointments_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
//             <p className='text-gray-400'>Appointments</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
//             <p className='text-gray-400'>Patients</p></div>
//         </div>
//       </div>

//       <div className='bg-white'>
//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
//           <img src={assets.list_icon} alt="" />
//           <p className='font-semibold'>Latest Bookings</p>
//         </div>

//         <div className='pt-4 border border-t-0'>
//           {dashData.latestAppointments.slice(0, 5).map((item, index) => (
//             <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
//               <img className='rounded-full w-10' src={item.userData.image} alt="" />
//               <div className='flex-1 text-sm'>
//                 <p className='text-gray-800 font-medium'>{item.userData.name}</p>
//                 <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
//               </div>
//               {item.cancelled
//                 ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                 : item.isCompleted
//                   ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                   : <div className='flex'>
//                     <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                     <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                   </div>
//               }
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default DoctorDashboard


//chat gpt
import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';


const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment, getAppointments, appointments } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    if (dToken) {
      getDashData();
      getAppointments(); // Fetch all appointments
    }
  }, [dToken]);

  // Function to handle View Profile
  const handleViewProfile = (userId) => {
    const userProfile = appointments.find(app => app.userData._id === userId);
    if (userProfile) {
      setSelectedProfile(userProfile.userData);
    }
  };

  return dashData && (
    <div className='m-5'>
      {/* Dashboard Stats */}
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>

              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/viewReport/${item.userId}`)} 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                  >
                    View Report
                  </button>
                  
                  <button 
                    onClick={() => navigate(`/viewProfile/${item.userId}`)} 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                  >
                    View Profile
                  </button>
                </div>
              ) : (
                <div className='flex'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Complete" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Patient Profile</h2>
            <img className="w-24 h-24 rounded-full mx-auto mb-3" src={selectedProfile.image} alt="Profile" />
            <p><strong>Name:</strong> {selectedProfile.name}</p>
            <p><strong>Email:</strong> {selectedProfile.email}</p>
            <p><strong>Phone:</strong> {selectedProfile.phone}</p>
            <button 
              onClick={() => setSelectedProfile(null)} 
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
