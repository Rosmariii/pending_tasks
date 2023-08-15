import express from "express";
import router from "./routes/tasks.routes";
import routerUser from "./routes/user.routes";
import { AppDataSource } from "./db";
import { PORT } from "./config";

const app = express();

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());
    app.use(router);
    app.use(routerUser);

    app.listen(PORT, () => {
      console.log(PORT);
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
