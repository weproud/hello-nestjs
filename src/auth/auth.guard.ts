import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    console.log(authorization);
    if (authorization) {
      const [scheme, token] = authorization.split(' ');
      console.log([scheme, token]);
      return scheme.toLowerCase() === 'bearer' && token === 'hello-nestjs';
    }
    throw new UnauthorizedException();
  }
}
