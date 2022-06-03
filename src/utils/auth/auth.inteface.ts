import { DataStoredInToken } from "./models/auth.interface";

export interface IAuthService {
  encriptPassword(password: string): Promise<string>;
  validatePassword(password: string, passwordDB: string): Promise<boolean>;
  createToken(dataStoredInToken: DataStoredInToken): string;
  verifyToken(token: string): Promise<DataStoredInToken>;
}