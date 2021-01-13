import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {
    constructor() {}

    logInfo(message: string) {
        // tslint:disable-next-line:no-console
        console.info(message);
    }

    logError(message: string) {
        // tslint:disable-next-line:no-console
        console.error(message);
    }
}
