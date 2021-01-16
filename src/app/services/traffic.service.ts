import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SRBaseService } from './sr-base.service';
import { TrafficArea, TrafficAreaResult, TrafficAreasResult } from '../models/traffic-area';
import { TrafficMessagesResult } from '../models/traffic-messages';
import { TrafficMessageViewModel } from '../view-models/traffic-message-vm';
import { calcDistanceKm } from '../utils/distance-helper';
import { convertFromJSONstring } from '../utils/date-helper';
import { LoggingService } from './logging.service';
import { GeoPosition } from '../models/geo-position';

@Injectable({
    providedIn: 'root'
})
export class TrafficService extends SRBaseService {
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

    async fetchAllTrafficAreas(): Promise<TrafficAreasResult> {
        let url = `${this.BaseUrl}traffic/areas/?page=${1}&size=${100}&${this.FormatParam}`;
        return this.http.get<TrafficAreasResult>(`${url}`).toPromise();
    }
    async fetchClosestTrafficAreaForPosition(position: GeoPosition): Promise<TrafficArea> {
        let url = `${this.BaseUrl}traffic/areas/?longitude=${position.lng}&latitude=${position.lat}&${this.FormatParam}`;
        const res = await this.http.get<TrafficAreaResult>(`${url}`).toPromise();
        return res.area;
    }

    async fetchAllTrafficMessagesForArea(
        trafficAreaName: string,
        position: GeoPosition
    ): Promise<TrafficMessageViewModel[]> {
        let url = `${this.BaseUrl}traffic/messages/?trafficareaname=${trafficAreaName}&page=${1}&size=${100}&${
            this.FormatParam
        }`;
        const res = await this.http.get<TrafficMessagesResult>(`${url}`).toPromise();
        const messages: TrafficMessageViewModel[] = [];
        res.messages.forEach((e) => {
            let m = new TrafficMessageViewModel();

            m.categoryName = this.categoryMap[e.category];
            m.priorityName = this.priorityNameMap[e.priority];
            m.priority = e.priority;
            m.description = e.description;
            m.title = e.title;
            m.subCategory = e.subcategory;
            m.exactLocation = e.exactlocation;
            m.latitude = e.latitude;
            m.longitude = e.longitude;

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
        return messages;
    }
}
