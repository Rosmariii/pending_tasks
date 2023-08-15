import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Tasks } from "../entities/tasksEntity";

export class TaskController {
  taskRepository = AppDataSource.getRepository(Tasks);

  async createTask(req: Request, res: Response) {
    try {
      const { title, description } = req.body;

      const newTask = await this.taskRepository.save(title, description);
      res.json(newTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear tarea" });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskRepository.find();
      res.json(tasks);
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
