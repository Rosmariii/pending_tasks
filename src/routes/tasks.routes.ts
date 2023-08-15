import express from "express";
import { TaskController } from "../controller/tasksController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const taskController = new TaskController();

router.get(
  "/tasks",
  AuthMiddleware.authenticateJWT,
  taskController.getAllTasks.bind(taskController)
);
router.post(
  "/tasks",
  AuthMiddleware.authenticateJWT,
  taskController.createTask.bind(taskController)
);
router.patch(
  "/tasks/:id",
  AuthMiddleware.authenticateJWT,
  taskController.modifyTask.bind(taskController)
);
router.delete(
  "/tasks/:id",
  AuthMiddleware.authenticateJWT,
  taskController.deleteTask.bind(taskController)
);

export default router;
