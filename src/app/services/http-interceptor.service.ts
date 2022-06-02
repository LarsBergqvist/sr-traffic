import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen } from 'rxjs/operators';
import { ErrorOccurredMessage } from '../messages/error-occurred.message';
import { MessageBrokerService } from './message-broker.service';
import { LoggingService } from './logging.service';

function delayedRetry(delayMs: number, maxRetries: number) {
    let retries = maxRetries;
    return (src: Observable<any>) =>
        src.pipe(
            retryWhen((errors: Observable<any>) =>
                errors.pipe(
                    delay(delayMs),
                    mergeMap((error) =>
                        retries-- > 0 ? of(error) : throwError(() => new Error('Network problem, try again.'))
                    )
                )
            )
        );
}

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private readonly messageService: MessageBrokerService, private readonly logging: LoggingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            delayedRetry(1000, 3),
            catchError((error) => this.handleError(error, this.messageService))
        );
    }

    private handleError(error: Error, messageService: MessageBrokerService) {
        if (error) {
            this.logging.logError(error.message);
            messageService.sendMessage(new ErrorOccurredMessage(error.message));
        } else {
            this.logging.logError('An error has occurred.');
            messageService.sendMessage(new ErrorOccurredMessage('An error has occurred'));
        }
        return throwError(() => new Error(error.message || 'An error has occurred'));
    }
}
