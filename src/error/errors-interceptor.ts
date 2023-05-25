import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
    NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((error) => {
                    console.log("ERROR: ", error);

                    const message = error.meta?.cause ? error.meta.cause : error.name
                    const code = error.code

                    switch (code) {
                        case "P2025":
                            throw new NotFoundException(message);
                        case "P2002":
                            throw new Error(error);
                        default:
                            throw error;
                    }
                }))
    }
}