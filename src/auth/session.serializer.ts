import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, userId: string) => void) {
    done(null, user.id);
  }

  deserializeUser(id: string, done: (err: Error, user: any) => void) {
    const user = this.usersService.findOneById(id);
    done(null, user);
  }
}
