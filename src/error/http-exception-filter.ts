import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const message = exception["response"] ? exception["response"].message : exception.message

        response
            .status(status)
            .json({
                status: status,
                message: message,
                timestamp: new Date().toISOString(),
                url: request.url,
            });
    }
}