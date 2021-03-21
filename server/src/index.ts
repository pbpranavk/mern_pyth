import "reflect-metadata";
import { createConnection } from "typeorm";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes/TodoRoutes";

const port = 8000;

createConnection()
  .then(async (connection) => {
    console.log("Connected with database");

    const app = express();
    var corsOptions = {
      origin: "http://localhost:3000/",
    };

    app.use(cors());
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      res.send({ message: "Hello Typeorm" });
    });

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.listen(port, () => {
      console.log(`Server is up & running @ http://localhost:${port}/`);
    });

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));
