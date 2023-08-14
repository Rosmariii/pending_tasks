import express from "express";
import { createConnection } from "typeorm";
import router from "./routes/tasks.routes";
import { AppDataSource } from "./db";

const app = express();

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());
    app.use(router);

    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
