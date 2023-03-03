import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

interface UserParams {
  username: string;
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':username')
  async findOne(@Param() params: UserParams): Promise<User> {
    const user: User = await this.usersService.findByUsername(params.username);
    return user;
  }
}
