import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { LoggerMiddleware } from '../logger.middleware';
import { UsersService } from '../users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([AuthEntity])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UsersService, JwtStrategy],
  exports: [AuthModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
