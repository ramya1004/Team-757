import express from 'express';
import  addPatientsWithCaretaker  from '../controllers/caretakerPatientController.js';


const docRouter = express.Router();

docRouter.post("/assignCareTaker", addPatientsWithCaretaker)

export default docRouter;