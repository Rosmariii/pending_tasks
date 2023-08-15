import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tasks } from "./entities/tasksEntity";
import { HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";
import { User } from "./entities/userEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Tasks, User],
});
