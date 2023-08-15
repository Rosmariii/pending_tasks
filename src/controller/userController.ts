import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/userEntity";
import { AppDataSource } from "../db";

export class AuthController {
  userRepository = AppDataSource.getRepository(User);

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      res.send("Usuario registrado");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al registrarse" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await this.userRepository.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send("El usuario o contraseña son incorrectas");
      }

      const token = jwt.sign({ id: user.id }, "your-secret-key");
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al registrarse" });
    }
  }
}
