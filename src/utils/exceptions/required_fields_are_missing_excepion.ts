import { IAppException } from "./iapp_exception";

export class RequiredFieldsAreMissingException extends IAppException {
  constructor(message?: any) {
    super(
      message || {
        message: "all fields are required!",
        fields: message,
      },
      400
    );
  }
}
