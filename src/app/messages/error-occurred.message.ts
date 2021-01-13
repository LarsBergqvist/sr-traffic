import { Message } from './message';

export class ErrorOccurredMessage extends Message {
    errorMessage: string;
    constructor(errorMessage: string) {
        super();
        this.errorMessage = errorMessage;
    }

    get Type(): string {
        return 'ErrorOccurredMessage';
    }
}
