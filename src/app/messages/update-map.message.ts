import { Location } from '../models/location';
import { Message } from './message';

export class UpdateMapMessage extends Message {
    location: Location;
    constructor(location: Location) {
        super();
        this.location = location;
    }

    get Type(): string {
        return 'UpdateMapMessage';
    }
}
