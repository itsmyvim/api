import { Module } from '@nestjs/common';
import { PluginController } from './plugin.controller';
import { PluginService } from './plugin.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PluginController],
  providers: [PluginService],
  exports: [PluginService],
})
export class PluginModule {}
