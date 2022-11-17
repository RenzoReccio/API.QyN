import { User } from "../model/interface/users.interface";

export interface AuthMailRepository {
  sendMailToChangePassword(user: User): Promise<void>;
}