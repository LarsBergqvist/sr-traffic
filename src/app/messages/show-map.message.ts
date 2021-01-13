import { Location } from '../models/location';
import { Message } from './message';

export class ShowMapMessage extends Message {
    location: Location;
    title: string;
    constructor(location: Location, title: string) {
        super();
        this.location = location;
        this.title = title;
    }

    get Type(): string {
        return 'ShowMapMessage';
    }
}
