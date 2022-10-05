import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Todo } from "../entity/todo";
import { UserService } from "../services/user_service";
import { RequiredFieldsAreMissingException } from "../utils/exceptions/required_fields_are_missing_excepion";
import { UnauthorizedException } from "../utils/exceptions/unauthorized_exception";
import { verifyToken } from "../utils/helper/token_generator";
import { exceptionHandler } from "../utils/helper/exception_handler";
import { UserNotFoundException } from "../utils/exceptions/user_not_found_exception";
import { TodoNotFoundException } from "../utils/exceptions/todo_not_found_exception";
import { checkTokenAndGetUser } from "../utils/helper/check_token_and_get_user";

export class TodoController {
  private todoRepository = AppDataSource.getRepository(Todo);

  async allByUid(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);

      const todos = await this.todoRepository.findBy({ user: { id: user.id } });
      return { message: "Success", data: todos };
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      if (!id) throw new RequiredFieldsAreMissingException(["id"]);

      const user = await checkTokenAndGetUser(request.headers.authorization);

      const todo = await this.todoRepository.findOneBy({
        id: id,
        user: { id: user.id },
      });
      if (!todo) throw new TodoNotFoundException();

      return { message: "Success", data: todo };
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { title, description } = request.body;

      if (!title || !description)
        throw new RequiredFieldsAreMissingException(["title", "desciption"]);

      const user = await checkTokenAndGetUser(request.headers.authorization);

      const todo = { title: title, description: description, userId: user.id };
      return await this.todoRepository.save(todo);
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) throw new RequiredFieldsAreMissingException(["id"]);

      const user = await checkTokenAndGetUser(request.headers.authorization);

      let todoToRemove = await this.todoRepository.findOneBy({
        id: id,
        user: { id: user.id },
      });
      if (!todoToRemove) throw new TodoNotFoundException();
      return await this.todoRepository.remove(todoToRemove);
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }
}

export enum TodoControllerActions {
  allByUid = "allByUid",
  one = "one",
  save = "save",
  remove = "remove",
}
