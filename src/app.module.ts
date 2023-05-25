import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventModule } from './event/event.module';
import { LoggerModule } from 'nestjs-rollbar';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';


@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, AuthModule, EventModule,
  LoggerModule.forRoot({
    accessToken: process.env["ROLLBAR_LOGGER"],
    environment: process.env.NODE_ENV,
  }),

  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule { }
