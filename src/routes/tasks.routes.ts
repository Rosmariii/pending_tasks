import express from "express";
import { TaskController } from "../controller/tasksController";

const router = express.Router();
const taskController = new TaskController();

router.get("/tasks", taskController.getAllTasks.bind(taskController));
router.post("/tasks", taskController.createTask.bind(taskController));
router.patch("/tasks/:id", taskController.modifyTask.bind(taskController));
router.delete("/tasks/:id", taskController.deleteTask.bind(taskController));

export default router;
