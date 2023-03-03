import { Profile, Strategy } from 'passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: '207a80cc346e1b5e364b',
      clientSecret: 'f15575883fd62408200178f0d01aac4b4865cbe0',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    const user = await this.authService.validateUser({
      id: profile.id,
      displayName: profile.displayName,
      username: profile.username,
      accessToken,
    });
    if (!user) {
      // TODO Depending on the concrete implementation of findOrCreate(), throwing the
      // UnauthorizedException here might not make sense...
      throw new UnauthorizedException();
    }

    console.log(user);
    return user;
  }
}
