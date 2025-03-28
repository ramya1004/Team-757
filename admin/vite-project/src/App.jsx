import React, { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { CareTakerContext } from './context/CareTakerContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import CaretakerList from './pages/Doctor/CaretakerList';
import ViewProfile from './pages/Doctor/viewProfile';
import ViewPatientList from './pages/careTaker/ViewPatientList';
import DoctorDashboardReports from './pages/Doctor/viewReport';

import AddCareTaker from './pages/Admin/AddCareTaker';
import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import TaskManager from './pages/careTaker/TaskManager';
import ChatPage from './pages/Doctor/ChatPage';
import ChatSidebar from './components/chatSidebar';
import ChatContainer from './components/ChatContainer';
import ViewTask from './pages/careTaker/ViewTask';
import ChatHeader from './components/ChatHeader';
import ChatnavBar from './components/ChatnavBar';
import NoChatselected from './components/NoChatselected';
import MessageInput from './components/MessageInput'
import LobbyScreen from './pages/careTaker/screens/Lobby';
import RoomPage from './pages/careTaker/screens/Room';
 

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const{cToken} = useContext(CareTakerContext)

  return dToken || aToken || cToken ?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/viewReport/:userId' element={<DoctorDashboardReports />} />
          <Route path='/viewProfile/:userId' element={< ViewProfile/>} />
          <Route path='/taskManager/:userId' element={< TaskManager/>} />
          <Route path='/viewProfileForCaretaker/:cToken' element={< ViewPatientList/>} />
          <Route path='/add-CareTaker' element={<AddCareTaker/>} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/CaretakerList/:userId' element={<CaretakerList />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/ChatWithUsers' element={<ChatPage />} />
          <Route path="/viewTask/:userId" element={<ViewTask />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path='/ChatContainer' element={<ChatContainer />} />
          <Route path='/ChatHeader' element={<ChatHeader />} />
          <Route path='/ChatnavBar' element={<ChatnavBar />} />
          <Route path='/ChatSidebar' element={<ChatSidebar />} />
          <Route path='/MessageInput' element={<MessageInput />} />
          <Route path='/NoChatselected' element={<NoChatselected />} />
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
            {/* <Route path="/viewTask/:userId" element={<ViewTask />} /> */}
          


        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App