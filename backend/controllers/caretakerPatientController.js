import careTakerWithPatient from "../models/careTakerforPatient.js";


//add the careTaker
 const addPatientsWithCaretaker = async (req, res)  => {
    try {
      const { cId,docId,userId } = req.body;
      if (!cId) {
        return res.status(400).json({ status: false, msg: "careTaker not found" });
      }
      const analysisData = {
        cId,
        docId,
        
        userId
     
    }

    const newCareTakerWithPatient = new careTakerWithPatient(analysisData)
    await newCareTakerWithPatient.save()
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }
  export default addPatientsWithCaretaker