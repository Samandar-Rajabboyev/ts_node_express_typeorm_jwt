import { IAppException } from "./iapp_exception";

export class PasswordIncorrectException extends IAppException {
  constructor(message?: any) {
    super(message || "password is incorrect!", 401);
  }
}
