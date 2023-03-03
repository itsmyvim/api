import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [AuthService, GithubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
