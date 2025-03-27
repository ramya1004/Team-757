import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import careTakerModel from "../models/careTakerModel.js";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import careTakerWithPatient from "../models/careTakerforPatient.js";

const logincareTaker = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await careTakerModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ success: true, token: user._id }); // Using _id as token
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//get the user frofile which have care taker id


const allPatientsWithCaretaker = async (req, res) => {
    const { cId } = req.body;
    
    console.log("Received cId:", cId);

    try {
        // Convert cId to ObjectId if stored as ObjectId in MongoDB
        const users = await careTakerWithPatient.find({ cId });

        console.log("Fetched users:", users);

        res.json({ success: true, users });

    } catch (error) {
        console.log("Error fetching patients:", error);
        res.json({ success: false, message: error.message });
    }
};

//add care taker
const addPatientsWithCaretaker = async (req, res) => {
    try {
        const { cId, dtoken, userId } = req.body;
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        const docId = token_decode.id

        if (!cId ) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Fetch user data
        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Fetch doctor data
        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const analysisData = {
           
            userId,
            userData,
            docData,
            docId,
            cId

        };

        const newCareTakerWithPatient = new careTakerWithPatient(analysisData);
        await newCareTakerWithPatient.save();

        res.json({ success: true, message: "Patient assigned to caretaker successfully", newCareTakerWithPatient });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
//care taker list
const careTakerList = async (req, res) => {
    try {

        const caretakers = await careTakerModel.find({}).select(['-password', '-email'])
        res.json({ success: true, caretakers })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}



export {
    careTakerList,
    logincareTaker,
    allPatientsWithCaretaker,
    addPatientsWithCaretaker
}
