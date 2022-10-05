import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { hashPwd } from "../utils/helper/password_hash";
import { verifyToken } from "../utils/helper/token_generator";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async exists(id: any) {
    let exist: boolean = false;
    const user = await this.userRepository.findOneBy({ id: id });
    exist = user !== null;
    return exist;
  }

  async findUserViaUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findUserViaToken(token: string) {
    const username = (await verifyToken(token)).username;
    return await this.userRepository.findOneBy({ username: username });
  }
}
