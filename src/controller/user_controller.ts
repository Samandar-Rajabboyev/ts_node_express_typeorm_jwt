import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user";
import { hashPwd } from "../utils/helper/password_hash";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find({
      select: {
        username: true,
        fullName: true,
        id: true,
      },
    });
    return { message: "Success", data: users };
  }

  async save(request: Request, response: Response, next: NextFunction) {
    request.body.password = await hashPwd(request.body.password);
    return this.userRepository.save(request.body);
  }
}

export enum UserControllerActions {
  all = "all",
  save = "save",
}
