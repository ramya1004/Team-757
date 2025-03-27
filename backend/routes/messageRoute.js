import express from "express";
import { getUsersForSidebar,sendMessageForDoctors,sendMessage,getMessages,getDoctorsForSidebar,getMessagesofchat } from "../controllers/messageController.js";


// import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/getUsersForSidebar", getUsersForSidebar);
router.post("/sendMessage", sendMessage);
router.post("/getMessages", getMessages);
router.post("/getDoctorsForSidebar", getDoctorsForSidebar);
router.post("/getMessagesofchat", getMessagesofchat);
router.post("/sendMessageForDoctors", sendMessageForDoctors);


export default router;
