import axios from 'axios';
import { DBUser } from '../utils/ValidateLogin';

const SUCCESS: number = 200;

export class UsersApi {
  private hostname: string;
  private port: number;

  constructor(hostname: string, port: number) {
    this.hostname = hostname;
    this.port = port;
  }

  private getAllUsersEndPoint() {
    return `http://${this.hostname}:${this.port}/api/v1/users/allusers`;
  }

  async getAllUsers(): Promise<DBUser[]> {
    let users: DBUser[] = [];

    try {
      const response = await axios.get(this.getAllUsersEndPoint());

      if (response.status === SUCCESS) {
        users = response.data.body.message;
      }

      return users;
    } catch (err: any) {
      console.log(err.message);
    }

    return users;
  }
}
