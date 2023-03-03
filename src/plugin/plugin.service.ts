import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Mapping,
  SimplifiedMapping,
  UpdatePluginsDTO,
} from 'src/utils/interface';

@Injectable()
export class PluginService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async updatePlugins(args: UpdatePluginsDTO): Promise<User> {
    const user = await this.userModel.findOne({ key: args.key }).exec();
    if (!user) return;

    const mappings: Mapping[] = args.keymappings;
    const simplified: SimplifiedMapping[] = [];

    for (const mapping of mappings) {
      const simplifiedMapping: SimplifiedMapping = {
        lhs: mapping.lhs,
        rhs: mapping.rhs,
      };
      simplified.push(simplifiedMapping);
    }

    console.log(simplified);
    console.log(args.plugins);

    user.plugins = args.plugins;
    await user.save();

    return user;
  }
}
