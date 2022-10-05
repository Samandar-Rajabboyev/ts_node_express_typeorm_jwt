import { User } from "../../entity/user";
import { UserService } from "../../services/user_service";
import { UnauthorizedException } from "../exceptions/unauthorized_exception";
import { UserNotFoundException } from "../exceptions/user_not_found_exception";

export async function checkTokenAndGetUser(authorization: any): Promise<User> {
  const userService = new UserService();

  const token = authorization;
  if (!token) throw new UnauthorizedException();

  const user = await userService.findUserViaToken(token);
  if (!user) throw new UserNotFoundException();

  return user;
}
