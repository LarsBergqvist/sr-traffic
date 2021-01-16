import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ErrorOccurredMessage } from 'src/app/messages/error-occurred.message';
import { GeoPosition } from 'src/app/models/geo-position';
import { TrafficArea } from 'src/app/models/traffic-area';
import { LoggingService } from 'src/app/services/logging.service';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { TrafficService } from 'src/app/services/traffic.service';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';

@Component({
    selector: 'app-messages',
    templateUrl: './traffic-messages.component.html',
    styleUrls: ['./traffic-messages.component.scss']
})
export class TrafficMessagesComponent implements OnInit {
    isLoading = false;

    position: GeoPosition = {
        lng: 0,
        lat: 0
    };

    trafficArea: TrafficArea;

    messages: TrafficMessageViewModel[];
    allTrafficAreas: TrafficArea[];

    areaOptions: SelectItem[];
    selectedArea: number;

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
                this.position.lat = position.coords.latitude;
                this.position.lng = position.coords.longitude;
                this.trafficArea = await this.service.fetchClosestTrafficAreaForPosition(this.position);
                await this.fetchMessagesForArea();
                this.selectedArea = this.trafficArea.trafficdepartmentunitid;
            },
            (error) => {
                this.broker.sendMessage(new ErrorOccurredMessage(error.message));
            }
        );
    }

    async fetchMessagesForArea() {
        if (this?.trafficArea?.name) {
            try {
                this.isLoading = true;
                this.messages = [];
                this.messages = await this.service.fetchAllTrafficMessagesForArea(this.trafficArea.name, this.position);
            } catch (e) {
                this.logger.logError(e);
                return;
            } finally {
                this.isLoading = false;
            }
        }
    }

    async onAreaChanged(event) {
        if (event.value !== '') {
            this.trafficArea = this.getAreaFromId(event.value);
            await this.fetchMessagesForArea();
        }
    }
}
