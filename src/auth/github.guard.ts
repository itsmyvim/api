import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GithubOauthGuard extends AuthGuard('github') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const id = req.session.passport.user;
    const user = await this.userService.findOneById(id);
    req.user = user;
    return user ? true : false;
  }
}
