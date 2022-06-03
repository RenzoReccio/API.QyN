import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/utils/auth/auth.service';
import { ConfigService } from 'src/utils/config/config.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateToken(request);
  }

  async validateToken(request: any) {

    const Authorization = (request.header('Authorization') ? request.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      try {
        (await this._authService.verifyToken(Authorization))
      } catch (error) {
        throw new HttpException('Token invalido.', 401);
      }
    } else {
      throw new HttpException('No hay token en el request.', 404);
    }
    return true;
  }
}
