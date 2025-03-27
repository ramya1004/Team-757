import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import ReportData from "../models/reportmodel.js";
import userModel from "../models/userModel.js";

// API for doctor Login 
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await doctorModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//add the symptomreport


const addReport = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { token,docId,  symptoms, duration, painLevel, bodyTemperature, bloodPressure, existingConditions, medications, additionalNotes, appointmentDate, status } = req.body;
  const token_decode = jwt.verify(token, process.env.JWT_SECRET)
  const userId = token_decode.id;
        // Validate Required Fields
        // if (!userId || !docId || !duration || !appointmentDate) {
        //     return res.status(400).json({ success: false, message: "Missing required fields" });
        // }

        // Convert only if the values exist, otherwise set to an empty array
        const reportData = new ReportData({
            userId:userId,
            docId,
            symptoms: symptoms ? symptoms.split(',') : [],  
            duration,
            painLevel: Number(painLevel) || 1,
            bodyTemperature: bodyTemperature || null,
            bloodPressure: bloodPressure || null,
            existingConditions: existingConditions ? existingConditions.split(',') : [],
            medications: medications ? medications.split(',') : [],
            additionalNotes: additionalNotes || '',
            appointmentDate,
            status: status || 'Pending',
        });

        // Save the report
        await reportData.save();

        res.status(201).json({ success: true, message: 'Report Added Successfully', report: reportData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while adding the report." });
    }
};







//get the symptom data by docID


const getReportsByUserId = async function (req, res) {
    try {
        const userId = req.body.userId;  // Extract the user ID from request body
       
        const report = await ReportData.find({ userId: userId });
console.log(report)
        if (!report || report.length === 0) {
            return res.status(404).json({ error: "Report not found" });
        }

        const reportData = report.map(item => ({
            report_id: item._id,
            docId: item.docId,
            symptoms: item.symptoms,
            duration: item.duration,
            painLevel: item.painLevel,
            bodyTemperature: item.bodyTemperature,
            bloodPressure: item.bloodPressure,
            existingConditions: item.existingConditions,
            medications: item.medications,
            additionalNotes: item.additionalNotes,
            appointmentDate: item.appointmentDate,
            status: item.status,
            created_at: item.created_at
        }));
console.log(reportData);
        res.json({ reports: reportData, success: true });
    } catch (err) {
        res.status(400).json({ error: "Error fetching report data", details: err });
    }
};

//update the user data adding careTaker id and doc id
const addCareTakerID = async (req, res) => {

        try {
            const { userId,docId,cId } = req.body;
            const _id = userId;
            if (!userId) {
                return res.status(400).json({ error: "Missing employee ID" });
            }
            
            const updatedUser = await userModel.findByIdAndUpdate(
                _id,
                { docId, cId},
                { new: true }
            );
            
            res.json({ message: "Updated successfully", updatedUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    // //update the cId by doctor
    // const updateProfile = async (req, res) => {
    //     try {
    //         const { userId, cId } = req.body;
    
    //         if (!cId) {
    //             return res.json({ success: false, message: "Data Missing" });
    //         }
    
    //         await userModel.findByIdAndUpdate(userId, { cId });
    
    //         res.json({ success: true, message: 'Profile Updated' });
    //     } catch (error) {
    //         console.log(error);
    //         res.json({ success: false, message: error.message });
    //     }
    // };





export {

    addReport,
    addCareTakerID,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    doctorList,
    changeAvailablity,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile,
    getReportsByUserId
}