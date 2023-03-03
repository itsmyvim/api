import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDetails } from 'src/utils/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const createdCat = await this.userModel.create({
      key: uuidv4(),
      ...createUserDto,
    });
    return createdCat;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(user: User, details: UpdateUserDetails) {
    console.log('Update User');
    const userObject = JSON.parse(JSON.stringify(user));
    await this.userModel.updateOne(
      { id: user.id },
      {
        ...userObject,
        ...details,
      },
    );
    return this.userModel.findOne({ id: user.id }).exec();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id: id }).exec();
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username: username }).exec();
    return user;
  }
}
