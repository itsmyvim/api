import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/schemas/user.schema';
import { ReqUser } from 'src/utils/interface';
import { AuthenticatedGuard, GithubOauthGuard } from './github.guard';

@Controller('auth/github')
export class AuthController {
  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    // Passport automatically creates a `user` object, based on the return value of our
    // GithubOauthStrategy#validate() method, and assigns it to the Request object as `req.user`

    const user = req.user as User;

    res.redirect(`http://localhost:5173/${user.username}`);
    return user;
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: ReqUser) {
    console.log('STATUS');
    console.log(req.user);
    return req.user;
  }
}
