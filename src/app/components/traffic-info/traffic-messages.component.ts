import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { ErrorOccurredMessage } from 'src/app/messages/error-occurred.message';
import { Location } from 'src/app/models/location';
import { TrafficArea } from 'src/app/models/traffic-area';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { TrafficService } from 'src/app/services/traffic.service';
import { convertFromJSONstring } from 'src/app/utils/date-helper';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';

declare var google: any;

@Component({
    selector: 'app-messages',
    templateUrl: './traffic-messages.component.html',
    styleUrls: ['./traffic-messages.component.scss']
})
export class TrafficMessagesComponent implements OnInit {
    long: number;
    lat: number;

    trafficArea: TrafficArea;

    messages: TrafficMessageViewModel[];
    allTrafficAreas: TrafficArea[];

    areaOptions: SelectItem[];
    selectedArea: number;

    location: Location;

    totalHits = 0;
    pageSize = 5;

    categoryMap = {
        0: 'Vägtrafik',
        1: 'Kollektivtrafik',
        2: 'Planerad störning',
        3: 'Övrigt'
    };

    priorityNameMap = {
        0: 'Empty',
        1: 'Mycket allvarlig händelse',
        2: 'Stor händelse',
        3: 'Störning',
        4: 'Information',
        5: 'Mindre störning'
    };

    constructor(private readonly broker: MessageBrokerService, private readonly service: TrafficService) {}

    async ngOnInit() {
        const res = await this.service.fetchAllTrafficAreas();
        this.allTrafficAreas = res.areas;
        this.allTrafficAreas.sort((a, b) => a.name.localeCompare(b.name));
        this.areaOptions = [];
        const categories = this.allTrafficAreas.map((c) => ({
            label: c.name,
            value: c.trafficdepartmentunitid
        }));
        this.areaOptions.push(...categories);
    }

    calcDistanceKm(fromLat, fromLng, toLat, toLng): number {
        var dist = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(fromLat, fromLng),
            new google.maps.LatLng(toLat, toLng)
        );
        return Math.round(dist / 1000);
    }
    getZoomForArea(unitid: number) {
        const area = this.allTrafficAreas.find((a) => a.trafficdepartmentunitid === unitid);
        return area.zoom;
    }

    getAreaFromId(unitid: number) {
        const area = this.allTrafficAreas.find((a) => a.trafficdepartmentunitid === unitid);
        return area;
    }

    onClick() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                this.lat = position.coords.latitude;
                this.long = position.coords.longitude;
                const res = await this.service.fetchTrafficAreaForPosition(this.long, this.lat);
                this.trafficArea = res.area;
                await this.fetchMessagesForArea(0);
                this.selectedArea = res.area.trafficdepartmentunitid;
            },
            (error) => {
                this.broker.sendMessage(new ErrorOccurredMessage(error.message));
            }
        );
    }

    async loadLazy(event: LazyLoadEvent) {
        await this.fetchMessagesForArea(event.first);
    }
    async fetchMessagesForArea(first: number) {
        if (this?.trafficArea?.name) {
            const page = first / this.pageSize + 1;
            const messeagesResult = await this.service.fetchTrafficMessagesForAreaFor(this.trafficArea.name, 1, 100);
            this.totalHits = messeagesResult.pagination.totalhits;
            this.messages = [];
            messeagesResult.messages.forEach((e) => {
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

                if (this.long && this.lat && e.latitude && e.longitude) {
                    try {
                        m.distance = this.calcDistanceKm(this.lat, this.long, e.latitude, e.longitude);
                    } catch (e) {
                        console.log(e);
                    }
                }

                if (e.createddate) {
                    m.createdDate = convertFromJSONstring(e.createddate);
                }
                this.messages.push(m);
            });
            this.messages.sort((a, b) => (a.priority < b.priority ? -1 : 1));
        }
    }

    async onAreaChanged(event) {
        if (event.value !== '') {
            this.trafficArea = this.getAreaFromId(event.value);
            await this.fetchMessagesForArea(0);
        }
    }
}
