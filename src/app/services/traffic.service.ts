import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SRBaseService } from './sr-base.service';
import { TrafficArea, TrafficAreaResult, TrafficAreasResult } from '../models/traffic-area';
import { TrafficMessagesResult } from '../models/traffic-messages';
import { TrafficMessageViewModel } from '../view-models/traffic-message-vm';
import { calcDistanceKm } from '../utils/distance-helper';
import { convertFromJSONstring } from '../utils/date-helper';
import { LoggingService } from './logging.service';
import { GeoPosition } from '../view-models/geo-position';
import { lastValueFrom } from 'rxjs';

export enum Priority {
    Empty = 0,
    MycketAllvarligHändelse = 1,
    StorHändelse = 2,
    Störning = 3,
    Information = 4,
    MindreStörning = 5
}

export enum Category {
    Vägtrafik = 0,
    Kollektivtrafik = 1,
    PlaneradStörening = 2,
    Övrigt = 3
}

export enum SubCategory {
    Vägarbete = 'Vägarbete',
    Trafikstörning = 'Trafikstörning',
    TrafikOlycka = 'Trafikolycka'
}

@Injectable({
    providedIn: 'root'
})
export class TrafficService extends SRBaseService {
    private cachedMessages: TrafficMessageViewModel[];

    private readonly categoryMap = {
        0: 'Vägtrafik',
        1: 'Kollektivtrafik',
        2: 'Planerad störning',
        3: 'Övrigt'
    };

    private readonly priorityNameMap = {
        0: 'Empty',
        1: 'Mycket allvarlig händelse',
        2: 'Stor händelse',
        3: 'Störning',
        4: 'Information',
        5: 'Mindre störning'
    };

    constructor(private readonly http: HttpClient, private readonly logger: LoggingService) {
        super();
    }

    async fetchAllTrafficAreas(): Promise<TrafficArea[]> {
        let url = `${this.BaseUrl}traffic/areas/?page=${1}&size=${100}&${this.FormatParam}`;
        const res = await lastValueFrom(this.http.get<TrafficAreasResult>(`${url}`));
        res.areas.sort((a, b) => a.name.localeCompare(b.name));
        return res.areas;
    }

    async fetchClosestTrafficAreaForPosition(position: GeoPosition): Promise<TrafficArea> {
        let url = `${this.BaseUrl}traffic/areas/?longitude=${position.lng}&latitude=${position.lat}&${this.FormatParam}`;
        const res = await lastValueFrom(this.http.get<TrafficAreaResult>(`${url}`));
        return res.area;
    }

    async fetchAllTrafficMessages(position: GeoPosition): Promise<TrafficMessageViewModel[]> {
        let url = `${this.BaseUrl}traffic/messages/?page=${1}&size=${200}&${this.FormatParam}`;
        return await this.fetchMessages(url, position);
    }

    async fetchAllTrafficMessagesForArea(
        trafficAreaName: string,
        position: GeoPosition
    ): Promise<TrafficMessageViewModel[]> {
        let url = `${this.BaseUrl}traffic/messages/?trafficareaname=${trafficAreaName}&page=${1}&size=${100}&${
            this.FormatParam
        }`;
        return await this.fetchMessages(url, position);
    }

    getCachedMessageFromId(id: number): TrafficMessageViewModel {
        if (!this.cachedMessages) return;
        return this.cachedMessages.find((m) => m.id === id);
    }

    private async fetchMessages(url: string, position: GeoPosition): Promise<TrafficMessageViewModel[]> {
        const res = await lastValueFrom(this.http.get<TrafficMessagesResult>(`${url}`));
        const messages: TrafficMessageViewModel[] = [];
        res.messages.forEach((e) => {
            let m = new TrafficMessageViewModel();

            m.category = e.category;
            m.categoryName = this.categoryMap[e.category];
            m.priorityName = this.priorityNameMap[e.priority];
            m.priority = e.priority;
            m.description = e.description;
            m.title = e.title;
            m.subCategory = e.subcategory;
            m.exactLocation = e.exactlocation;
            m.latitude = e.latitude;
            m.longitude = e.longitude;
            m.id = e.id;

            if (position.lng && position.lat && e.latitude && e.longitude) {
                try {
                    m.distance = calcDistanceKm(position.lat, position.lng, e.latitude, e.longitude);
                } catch (e) {
                    this.logger.logError(e);
                }
            }

            if (e.createddate) {
                m.createdDate = convertFromJSONstring(e.createddate);
            }
            messages.push(m);
        });
        messages.sort((a, b) => (a.priority < b.priority ? -1 : 1));
        this.cachedMessages = messages;
        return this.cachedMessages;
    }
}
