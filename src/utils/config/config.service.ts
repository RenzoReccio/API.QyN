import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

  getNodeEnv(): string {
    return process.env.NODE_ENV
  }

  getPort() {
    return process.env.PORT
  }

  getDBHost() {
    return process.env.DB_HOST
  }

  getDBPort() {
    return Number(process.env.DB_PORT)
  }

  getDBUser() {
    return process.env.DB_USER
  }

  getDBPassword() {
    return process.env.DB_PASSWORD
  }

  getDBDatabase() {
    return process.env.DB_DATABASE
  }

  getSecretKey() {
    return process.env.SECRET_KEY
  }

  getLogFormat() {
    return process.env.LOG_FORMAT
  }

  getLogDir() {
    return process.env.PORT
  }

  getOrigin() {
    return process.env.ORIGIN
  }
}
