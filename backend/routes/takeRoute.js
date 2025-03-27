import express from 'express';
import { getTasks, getTask, postTask, putTask, deleteTask } from '../controllers/taskController';
import { verifyAccessToken } from "../middlewares.js"; // Changed require to import

const router = express.Router();

// Routes beginning with /api/tasks
router.get("/getTasks", getTasks);
router.get("/getTask", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.put("/putTask", verifyAccessToken, putTask);
router.delete("/deleteTask", verifyAccessToken, deleteTask);

module.exports = router;
