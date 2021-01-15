import { Location } from '../models/location';
import { Message } from './message';

export class ShowMapMessage extends Message {
    location: Location;
    title: string;
    details: string;
    exactLocation: string;
    constructor(location: Location, title: string, details?: string, exactLocation?: string) {
        super();
        this.location = location;
        this.title = title;
        this.details = details;
        this.exactLocation = exactLocation;
    }

    get Type(): string {
        return 'ShowMapMessage';
    }
}
