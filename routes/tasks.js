const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    console.error("Fetch tasks failed:", error.message);
    return res.status(500).json({ message: "Unable to fetch tasks." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required." });
    }

    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
    });


    return res.status(201).json(task);
  } catch (error) {
    console.error("Create task failed:");
    console.error(error);
    return res.status(500).json({ message: "Unable to create task." });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const allowedFields = ["title", "description", "status", "priority", "dueDate"];
    const updates = {};

    for (const field of allowedFields) {
      if (field in req.body) {
        updates[field] = req.body[field];
      }
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.json(task);
  } catch (error) {
    console.error("Update task failed:", error.message);
    return res.status(500).json({ message: "Unable to update task." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Delete task failed:", error.message);
    return res.status(500).json({ message: "Unable to delete task." });
  }
});

module.exports = router;
