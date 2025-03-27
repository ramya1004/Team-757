import Message from "../models/messageModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken"; 

//get the users at doctor side bar
export const getUsersForSidebar = async (req, res) => {
    try {
        const {  dToken } = req.body;
        const token_decode = jwt.verify(dToken, process.env.JWT_SECRET)
        const docId = token_decode.id
  
      const filteredUsers = await appointmentModel.find({ docId });
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  //get messages
  export const getMessages = async (req, res) => {
    try {
        const {  dToken,userId } = req.body;
        const token_decode = jwt.verify(dToken, process.env.JWT_SECRET)
        const docId = token_decode.id
        console.log(docId);
        console.log(userId)

   
  
      const messages = await Message.find({
        $or: [
          { senderId: docId, receiverId: userId },
          { senderId: userId, receiverId: docId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //send messages
  export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
    //   const { id: receiverId } = req.params;
    const {receiverId} = req.body;
      const {  dToken } = req.body;
      const token_decode = jwt.verify(dToken, process.env.JWT_SECRET)
      const docId = token_decode.id

      const senderId = docId;
  
    //   let imageUrl;
    //   if (image) {
    //     // Upload base64 image to cloudinary
    //     const uploadResponse = await cloudinary.uploader.upload(image);
    //     imageUrl = uploadResponse.secure_url;
    //   }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text
      });
  
      await newMessage.save();
  
    //   const receiverSocketId = getReceiverSocketId(receiverId);
    //   if (receiverSocketId) {
    //     io.to(receiverSocketId).emit("newMessage", newMessage);
    //   }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  //for user side
  //get user in side bar
  export const getDoctorsForSidebar = async (req, res) => {
    try {
        const {  token } = req.body;
          const token_decode = jwt.verify(token, process.env.JWT_SECRET)
            const userId = token_decode.id
            console.log(userId)
  
      const filteredUsers = await appointmentModel.find({ userId });
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //get messages
  export const getMessagesofchat = async (req, res) => {
    try {
        const {  token,docId } = req.body;
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        const userId = token_decode.id
        console.log(docId);
        console.log(userId)

   
  
      const messages = await Message.find({
        $or: [
          { senderId: docId, receiverId: userId },
          { senderId: userId, receiverId: docId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //send messages
  export const sendMessageForDoctors = async (req, res) => {
    try {
      const { text, image } = req.body;
    //   const { id: receiverId } = req.params;
    const {receiverId} = req.body;
      const {  token } = req.body;
      const token_decode = jwt.verify(token, process.env.JWT_SECRET)
      const userId = token_decode.id

      const senderId = userId;
  
    //   let imageUrl;
    //   if (image) {
    //     // Upload base64 image to cloudinary
    //     const uploadResponse = await cloudinary.uploader.upload(image);
    //     imageUrl = uploadResponse.secure_url;
    //   }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text
      });
  
      await newMessage.save();
  
    //   const receiverSocketId = getReceiverSocketId(receiverId);
    //   if (receiverSocketId) {
    //     io.to(receiverSocketId).emit("newMessage", newMessage);
    //   }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


