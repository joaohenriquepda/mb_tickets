import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';
import { RollbarLogger } from 'nestjs-rollbar';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly rollbarLogger: RollbarLogger) { }

    @ApiBody({ description: "Body for login event", type: LoginRequestBody })
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {

        try {
            this.rollbarLogger.debug(`[${AuthController.name}] - Initiate login process - DATA: ${JSON.stringify(req.user)}`, JSON.stringify(req.user));
            const user = this.authService.login(req.user);
            this.rollbarLogger.debug(`[${AuthController.name}] - Success Login`, JSON.stringify(user));
            return user;

        } catch (error) {
            this.rollbarLogger.error(`[${new Date().valueOf()} - ${AuthController.name}]- An error occurred while trying login - DATA: ${JSON.stringify(error)} `, JSON.stringify(error))
            throw error
        }
    }
}

