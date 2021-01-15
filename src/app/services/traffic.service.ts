import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SRBaseService } from './sr-base.service';
import { TrafficAreaResult, TrafficAreasResult } from '../models/traffic-area';
import { TrafficMessagesResult } from '../models/traffic-messages';

@Injectable({
    providedIn: 'root'
})
export class TrafficService extends SRBaseService {
    constructor(private readonly http: HttpClient) {
        super();
    }

    async fetchAllTrafficAreas(): Promise<TrafficAreasResult> {
        let url = `${this.BaseUrl}traffic/areas/?page=${1}&size=${100}&${this.FormatParam}`;
        return this.http.get<TrafficAreasResult>(`${url}`).toPromise();
    }
    async fetchTrafficAreaForPosition(longitude: number, latitude: number): Promise<TrafficAreaResult> {
        let url = `${this.BaseUrl}traffic/areas/?longitude=${longitude}&latitude=${latitude}&${this.FormatParam}`;
        return this.http.get<TrafficAreaResult>(`${url}`).toPromise();
    }

    async fetchTrafficMessagesForAreaFor(
        trafficAreaName: string,
        page: number,
        size: number
    ): Promise<TrafficMessagesResult> {
        let url = `${this.BaseUrl}traffic/messages/?trafficareaname=${trafficAreaName}&page=${page}&size=${size}&${this.FormatParam}`;
        return this.http.get<TrafficMessagesResult>(`${url}`).toPromise();
    }
}
