// MongoDB Schemas - Add these models to your project

// User Schema (save as models/User.js)
const userSchema = {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Task Schema (save as models/Task.js)
const taskSchema = {
  title: { type: String, required: true },
  description: String,
  userId: { type: String, required: true }, // Reference to User
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// MongoDB Connection Details
// Local MongoDB: mongodb://127.0.0.1:27017/task-manager
// MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database-name
// Docker MongoDB: mongodb://mongo:27017/task-manager
