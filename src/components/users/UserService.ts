import axios from 'axios';
import { DBUser } from '../../utils/ValidateLogin';

export class UserService {
  private hostname: string;
  private port: string;

  constructor(hostname: string, port: string) {
    this.hostname = hostname;
    this.port = port;
  }

  private addUserEndpoint(): string {
    return `http://${this.hostname}:${this.port}/api/v1/users/adduser`;
  }

  private updateUserEndPoint(): string {
    return `http://${this.hostname}:${this.port}/api/v1/users/updateuser`;
  }

  async addUser(dbUser: DBUser): Promise<void> {
    await axios.post(this.addUserEndpoint(), dbUser);
  }

  async updateUser(dbUser: DBUser): Promise<void> {
    await axios.post(this.updateUserEndPoint(), dbUser);
  }
}
