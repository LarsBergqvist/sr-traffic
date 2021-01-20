import { GeoPosition } from '../view-models/geo-position';
import { Message } from './message';

export class ShowMapMessage extends Message {
    positions: GeoPosition[];
    userPos: GeoPosition;
    title: string;
    details: string;
    constructor(positions: GeoPosition[], userPos: GeoPosition, title: string, details?: string) {
        super();
        this.positions = positions;
        this.userPos = userPos;
        this.title = title;
        this.details = details;
    }

    get Type(): string {
        return 'ShowMapMessage';
    }
}
