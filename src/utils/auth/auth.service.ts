import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { IAuthService } from './auth.interface';
import { DataStoredInToken } from './models/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private configService: ConfigService
  ) { }

  async encriptPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async validatePassword(password: string, passwordDB: string): Promise<boolean> {
    return await compare(password, passwordDB);
  }

  public createToken(dataStoredInToken: DataStoredInToken): string {
    const secretKey: string = this.configService.getSecretKey();
    const expiresIn: number = 60 * 60;


    return sign({ data: dataStoredInToken }, secretKey, { expiresIn });
  }

  public async verifyToken(token: string): Promise<DataStoredInToken> {
    const secretKey: string = this.configService.getSecretKey();

    return (await verify(token, secretKey)) as DataStoredInToken;
  }

  async generateRandomToken(): Promise<string> {
    return require('crypto').randomBytes(32).toString("hex");
  }
}
