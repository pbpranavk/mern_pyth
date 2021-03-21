import { TodoController } from "../controllers/TodoController";

export const Routes = [
  {
    method: "get",
    route: "/api/todo",
    controller: TodoController,
    action: "all",
  },
  {
    method: "get",
    route: "/api/todo/:id",
    controller: TodoController,
    action: "one",
  },
  {
    method: "post",
    route: "/api/todo",
    controller: TodoController,
    action: "save",
  },
  {
    method: "put",
    route: "/api/todo/:id",
    controller: TodoController,
    action: "save",
  },

  {
    method: "delete",
    route: "/api/todo/",
    controller: TodoController,
    action: "deleteAll",
  },
  {
    method: "delete",
    route: "/api/todo/:id",
    controller: TodoController,
    action: "remove",
  },
];
