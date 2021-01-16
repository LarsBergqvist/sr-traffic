import { GeoPosition } from '../models/geo-position';
import { Message } from './message';

export class ShowMapMessage extends Message {
    positions: GeoPosition[];
    title: string;
    details: string;
    constructor(positions: GeoPosition[], title: string, details?: string) {
        super();
        this.positions = positions;
        this.title = title;
        this.details = details;
    }

    get Type(): string {
        return 'ShowMapMessage';
    }
}
