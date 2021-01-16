import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ErrorOccurredMessage } from 'src/app/messages/error-occurred.message';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { GeoPosition } from 'src/app/models/geo-position';
import { TrafficArea } from 'src/app/models/traffic-area';
import { LoggingService } from 'src/app/services/logging.service';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { Priority, TrafficService } from 'src/app/services/traffic.service';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';

enum SortOrder {
    highestPriority = '1',
    leastDistance = '2',
    latestDate = '3'
}

@Component({
    selector: 'app-messages',
    templateUrl: './traffic-messages.component.html',
    styleUrls: ['./traffic-messages.component.scss']
})
export class TrafficMessagesComponent implements OnInit {
    sortOrder: SortOrder = SortOrder.highestPriority;
    showInformation = false;
    showTodayOnly = false;

    isLoading = false;

    position: GeoPosition = {
        lng: undefined,
        lat: undefined,
        info: undefined
    };

    trafficArea: TrafficArea;

    messages: TrafficMessageViewModel[];
    allTrafficAreas: TrafficArea[];

    areaOptions: SelectItem[];
    selectedArea: number;

    keyword = '';

    constructor(
        private readonly broker: MessageBrokerService,
        private readonly service: TrafficService,
        private readonly logger: LoggingService
    ) {}

    async ngOnInit() {
        this.allTrafficAreas = (await this.service.fetchAllTrafficAreas()).areas;
        this.allTrafficAreas.sort((a, b) => a.name.localeCompare(b.name));
        this.areaOptions = [];
        this.areaOptions.push({ label: 'Alla', value: 0 });
        const categories = this.allTrafficAreas.map((c) => ({
            label: c.name,
            value: c.trafficdepartmentunitid
        }));
        this.areaOptions.push(...categories);
    }

    onShowAllPositionsOnMap() {
        if (!this.messages) return;

        const positions: GeoPosition[] = [];
        this.messages
            .filter((m) => this.matchesKeyword(m))
            .forEach((m) => {
                const pos: GeoPosition = {
                    lat: m.latitude,
                    lng: m.longitude,
                    info: `${m.priorityName}: ${m.title}`
                };
                positions.push(pos);
            });
        if (positions.length == 0) return;

        let title = 'Alla trafikområden';
        if (this.trafficArea?.name) {
            title = `Trafikområde: ${this.trafficArea.name}`;
        }
        this.broker.sendMessage(new ShowMapMessage(positions, title));
    }

    matchesKeyword(message: TrafficMessageViewModel): boolean {
        if (!this.keyword || this.keyword.length < 2) return true;

        var re = new RegExp(this.keyword, 'gi');
        if (
            message.title.match(re) ||
            message.description.match(re) ||
            message.exactLocation.match(re) ||
            message.priorityName.match(re) ||
            message.categoryName.match(re)
        ) {
            return true;
        } else {
            return false;
        }
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
        try {
            this.isLoading = true;
            this.messages = [];
            if (this.trafficArea?.name) {
                this.messages = await this.service.fetchAllTrafficMessagesForArea(this.trafficArea.name, this.position);
            } else {
                this.messages = await this.service.fetchAllTrafficMessages(this.position);
            }
            this.sortMessages();
        } catch (e) {
            this.logger.logError(e);
            return;
        } finally {
            this.isLoading = false;
        }
    }

    async onAreaChanged(event) {
        this.keyword = '';
        if (event.value !== '') {
            if (event.value == 0) {
                this.trafficArea = null;
                await this.fetchMessagesForArea();
            } else {
                this.trafficArea = this.getAreaFromId(event.value);
                await this.fetchMessagesForArea();
            }
        }
    }

    onSortOrdeChanged(event) {
        this.sortMessages();
    }

    matchesFilter(message: TrafficMessageViewModel) {
        if (message.priority === Priority.Information) {
            if (!this.showInformation) {
                return false;
            }
        }
        const now = new Date().getDate();
        if (message.createdDate.getDate() !== now) {
            if (this.showTodayOnly) {
                return false;
            }
        }
        return true;
    }

    private sortMessages() {
        switch (this.sortOrder) {
            case SortOrder.leastDistance:
                this.messages.sort(
                    (a, b) => a.distance - b.distance || b.createdDate.getTime() - a.createdDate.getTime()
                );
                break;
            case SortOrder.highestPriority:
                this.messages.sort(
                    (a, b) => a.priority - b.priority || b.createdDate.getTime() - a.createdDate.getTime()
                );
                break;
            case SortOrder.latestDate:
                this.messages.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
                break;
        }
    }
}
