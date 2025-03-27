import express from 'express';
import {loginDoctor,addCareTakerID,getReportsByUserId, appointmentsDoctor, appointmentCancel, doctorList, changeAvailablity, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile,addReport } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';
import authUser from '../middleware/authUser.js';


const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor)
// doctorRouter.post("/addReport", authUser, addReport)
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.get("/list", doctorList)
doctorRouter.post("/getReportsByUserId", getReportsByUserId)
doctorRouter.post("/addCareTakerID", addCareTakerID)
doctorRouter.post("/change-availability", authDoctor, changeAvailablity)
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)
doctorRouter.post("/addReport",  addReport)
export default doctorRouter;
