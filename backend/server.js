import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import careTakerRouter from "./routes/careTakerRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import multer from "multer";
import PdfDetails from "./models/pdfDeatailModel.js";


// App config
const app = express();
app.use("/files", express.static("files"));
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/careTaker", careTakerRouter);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Create HTTP Server and Attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// WebRTC Signaling Logic
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected:`, socket.id);

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    socket.join(room);
    io.to(room).emit("user:joined", { email, id: socket.id });
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    const email = socketidToEmailMap.get(socket.id);
    emailToSocketIdMap.delete(email);
    socketidToEmailMap.delete(socket.id);
    console.log("User Disconnected:", socket.id);
  });
});


//multer configg


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });



app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  const userId=req.body.userId;

  try {
    await PdfDetails.create({ title: title, pdf: fileName ,userId:userId}); //
    res.json({ status: "ok", message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ status: "error", message: "Failed to upload file." });
  }
});

app.post("/get-files", async (req, res) => {
  try {
    const userId=req.body.userId;
    const files = await PdfDetails.find({userId:userId}); //
    res.json({ status: "ok", data: files });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch files." });
  }
});

// Start the server with Socket.io
server.listen(port, () => console.log(`Server started on PORT:${port}`));
