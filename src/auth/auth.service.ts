import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDTO } from 'src/users/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(createUserDto: CreateUserDTO): Promise<User> {
    const user = await this.usersService.findOneById(createUserDto.id);
    const { ...updatedDetails } = createUserDto;
    return user
      ? this.usersService.updateUser(user, updatedDetails)
      : this.usersService.create(createUserDto);
  }
}
