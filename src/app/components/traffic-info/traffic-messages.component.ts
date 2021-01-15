import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ErrorOccurredMessage } from 'src/app/messages/error-occurred.message';
import { TrafficArea } from 'src/app/models/traffic-area';
import { TrafficMessagesResult } from 'src/app/models/traffic-messages';
import { LoggingService } from 'src/app/services/logging.service';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { TrafficService } from 'src/app/services/traffic.service';
import { convertFromJSONstring } from 'src/app/utils/date-helper';
import { calcDistanceKm } from 'src/app/utils/distance-helper';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';

@Component({
    selector: 'app-messages',
    templateUrl: './traffic-messages.component.html',
    styleUrls: ['./traffic-messages.component.scss']
})
export class TrafficMessagesComponent implements OnInit {
    isLoading = false;

    lng: number;
    lat: number;

    trafficArea: TrafficArea;

    messages: TrafficMessageViewModel[];
    allTrafficAreas: TrafficArea[];

    areaOptions: SelectItem[];
    selectedArea: number;

    totalHits = 0;
    pageSize = 5;

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

    constructor(
        private readonly broker: MessageBrokerService,
        private readonly service: TrafficService,
        private readonly logger: LoggingService
    ) {}

    async ngOnInit() {
        this.allTrafficAreas = (await this.service.fetchAllTrafficAreas()).areas;
        this.allTrafficAreas.sort((a, b) => a.name.localeCompare(b.name));
        this.areaOptions = [];
        const categories = this.allTrafficAreas.map((c) => ({
            label: c.name,
            value: c.trafficdepartmentunitid
        }));
        this.areaOptions.push(...categories);
    }

    getAreaFromId(unitid: number) {
        const area = this.allTrafficAreas.find((a) => a.trafficdepartmentunitid === unitid);
        return area;
    }

    onFetchPosition() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                const res = await this.service.fetchTrafficAreaForPosition(this.lng, this.lat);
                this.trafficArea = res.area;
                await this.fetchMessagesForArea();
                this.selectedArea = res.area.trafficdepartmentunitid;
            },
            (error) => {
                this.broker.sendMessage(new ErrorOccurredMessage(error.message));
            }
        );
    }

    async fetchMessagesForArea() {
        if (this?.trafficArea?.name) {
            let messeagesResult: TrafficMessagesResult;
            try {
                this.isLoading = true;
                messeagesResult = await this.service.fetchTrafficMessagesForAreaFor(this.trafficArea.name, 1, 100);
            } catch (e) {
                this.logger.logError(e);
                return;
            } finally {
                this.isLoading = false;
            }
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

                if (this.lng && this.lat && e.latitude && e.longitude) {
                    try {
                        m.distance = calcDistanceKm(this.lat, this.lng, e.latitude, e.longitude);
                    } catch (e) {
                        this.logger.logError(e);
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
            await this.fetchMessagesForArea();
        }
    }
}
