import { Message } from './message';

export class SuccessInfoMessage extends Message {
    info: string;
    constructor(info: string) {
        super();
        this.info = info;
    }

    get Type(): string {
        return 'SuccessInfoMessage';
    }
}
