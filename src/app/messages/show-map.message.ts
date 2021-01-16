import { GeoPosition } from '../models/geo-position';
import { Message } from './message';

export class ShowMapMessage extends Message {
    position: GeoPosition;
    title: string;
    details: string;
    positionInfo: string;
    constructor(position: GeoPosition, title: string, details?: string, positionInfo?: string) {
        super();
        this.position = position;
        this.title = title;
        this.details = details;
        this.positionInfo = positionInfo;
    }

    get Type(): string {
        return 'ShowMapMessage';
    }
}
