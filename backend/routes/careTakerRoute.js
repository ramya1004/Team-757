import express from 'express';
const careTakerRouter = express.Router();
import { logincareTaker,allPatientsWithCaretaker,addPatientsWithCaretaker,careTakerList } from '../controllers/careTakerController.js';
careTakerRouter.post("/login", logincareTaker)
careTakerRouter.post("/allPatientsWithCaretaker", allPatientsWithCaretaker)
careTakerRouter.post("/addPatientsWithCaretaker", addPatientsWithCaretaker)
careTakerRouter.post("/careTakerList", careTakerList)

export default careTakerRouter;
