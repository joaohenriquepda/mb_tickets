import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventModule } from './event/event.module';
import { LoggerModule } from 'nestjs-rollbar';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, EventModule,
  LoggerModule.forRoot({
    accessToken: process.env["ROLLBAR_LOGGER"],
    environment: process.env.NODE_ENV,
  }),
  UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
