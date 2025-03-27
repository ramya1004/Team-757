import Task from "../models/taskmodel";
import userModel from "../models/userModel.js";
exports.getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.body.userId });
      res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }

  //get the task

  exports.getTask = async (req, res) => {
    try {
      if (!validateObjectId(req.body.taskId)) {
        return res.status(400).json({ status: false, msg: "Task id not valid" });
      }
  
      const task = await Task.findOne({ user: req.userId , _id: req.taskId });
      if (!task) {
        return res.status(400).json({ status: false, msg: "No task found.." });
      }
      res.status(200).json({ task, status: true, msg: "Task found successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }

  //add task
  exports.addTask = async (req, res) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.status(400).json({ status: false, msg: "Description of task not found" });
      }
      const task = await Task.create({ user: req.body.userId, description,cId });
      res.status(200).json({ task, status: true, msg: "Task created successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }
  //updtae task
  exports.upadteTask = async (req, res) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.status(400).json({ status: false, msg: "Description of task not found" });
      }
  
      if (!validateObjectId(req.body.taskId)) {
        return res.status(400).json({ status: false, msg: "Task id not valid" });
      }
  
      let task = await Task.findById(req.body._id);
      if (!task) {
        return res.status(400).json({ status: false, msg: "Task with given id not found" });
      }
  
      if (task.user != req.body.userId) {
        return res.status(403).json({ status: false, msg: "You can't update task of another user" });
      }
  
      task = await Task.findByIdAndUpdate(req.body._id, { description }, { new: true });
      res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }
  //deledte task
  exports.deleteTask = async (req, res) => {
    try {
      if (!validateObjectId(req.body.taskId)) {
        return res.status(400).json({ status: false, msg: "Task id not valid" });
      }
  
      let task = await Task.findById(req.body.taskId);
      if (!task) {
        return res.status(400).json({ status: false, msg: "Task with given id not found" });
      }
  
      if (task.user != req.user.id) {
        return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
      }
  
      await Task.findByIdAndDelete(req.params.taskId);
      res.status(200).json({ status: true, msg: "Task deleted successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }