import { Message } from './message';

export class ShowInfoSidebarMessage extends Message {
    id: number;
    constructor(id: number) {
        super();
        this.id = id;
    }

    get Type(): string {
        return 'ShowInfoSidebarMessage';
    }
}
