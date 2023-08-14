import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tasks } from "./entities/tasksEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "rosmari92",
  database: "new_tasks",
  synchronize: true,
  logging: true,
  entities: [Tasks],
});
