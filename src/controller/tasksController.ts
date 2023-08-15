import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Tasks } from "../entities/tasksEntity";
import jwt from "jsonwebtoken";

export class TaskController {
  taskRepository = AppDataSource.getRepository(Tasks);

  async createTask(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      //Refactorizar authHeader
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "your-secret-key");
        const userId = (decoded as any).id;

        const newTask = this.taskRepository.create({
          title,
          description,
          user: { id: userId },
        });

        const savedTask = await this.taskRepository.save(newTask);

        res.json(savedTask);
      } else {
        res.status(401).send("No autorizado");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear tarea" });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "your-secret-key");
        const userId = (decoded as any).id;

        const tasks = await this.taskRepository.find({
          where: { user: { id: userId } },
        });

        res.json(tasks);
      } else {
        res.status(401).send("No autorizado");
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener tareas" });
    }
  }

  async modifyTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const completedTask = req.body.completed;
      const task = await this.taskRepository.findOne({ where: { id } });

      if (task) {
        task.completed = completedTask;
        const modify = await this.taskRepository.save(task);
        res.status(200).json(modify);
      } else {
        res.status(500).json("Error al modificar");
      }
    } catch (error) {
      res.status(500).json({ error: "Error al modificar tarea" });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      await this.taskRepository.delete(taskId);
      res.json({ message: "Tarea eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error en eliminar la tarea" });
    }
  }
}
