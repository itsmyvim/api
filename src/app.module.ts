import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
import { PluginService } from './plugin/plugin.service';
import { PluginModule } from './plugin/plugin.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Vcut:09196606@cluster0.uh2tu.mongodb.net/test',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    UsersModule,
    PluginModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PluginService],
})
export class AppModule {}
