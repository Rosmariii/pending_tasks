import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Tasks } from "../entities/tasksEntity";

export class TaskController {
  taskRepository = AppDataSource.getRepository(Tasks);

  async createTask(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const newTask = await this.taskRepository.create(description);
      res.json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Error creating task" });
    }
  }

  //   async getAllTasks(req: Request, res: Response) {
  //     try {
  //       const tasks = await this.taskService.getAllTasks();
  //       res.json(tasks);
  //     } catch (error) {
  //       res.status(500).json({ error: "Error getting tasks" });
  //     }
  //   }

  //   async deleteTask(req: Request, res: Response) {
  //     try {
  //       const taskId = parseInt(req.params.id, 10);
  //       await this.taskService.deleteTask(taskId);
  //       res.json({ message: "Task deleted" });
  //     } catch (error) {
  //       res.status(500).json({ error: "Error deleting task" });
  //     }
  //   }
}
