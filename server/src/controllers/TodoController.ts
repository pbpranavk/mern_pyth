import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Todo } from "../entity/Todo";

export class TodoController {
  private todoRepository = getRepository(Todo);

  async all(request: Request, response: Response, next: NextFunction) {
    console.log("all");
    return this.todoRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.todoRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.todoRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let todoToRemove = await this.todoRepository.findOne(request.params.id);
    await this.todoRepository.remove(todoToRemove);
    return { message: `Deleted todo with id: ${request.params.id}` };
  }

  async deleteAll(request: Request, response: Response, next: NextFunction) {
    await this.todoRepository.delete({});
    return { message: "Deleted all todos" };
  }
}
