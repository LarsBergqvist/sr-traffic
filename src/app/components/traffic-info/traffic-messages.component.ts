import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ErrorOccurredMessage } from 'src/app/messages/error-occurred.message';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { GeoPosition } from 'src/app/view-models/geo-position';
import { TrafficArea } from 'src/app/models/traffic-area';
import { LoggingService } from 'src/app/services/logging.service';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { TrafficService } from 'src/app/services/traffic.service';
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
    includeCategoryOther = false;
    showTodayOnly = false;
    showOnlyPublicTransport = false;

    isLoading = false;

    position: GeoPosition = {
        lng: undefined,
        lat: undefined,
        info: undefined,
        id: undefined
    };

    messages: TrafficMessageViewModel[];

    areaOptions: SelectItem[];
    selectedArea: number;

    keyword = '';

    private static readonly PublicTransportCatName = 'Kollektivtrafik';
    private static readonly OtherTransportCatName = 'Övrigt';
    private trafficArea: TrafficArea;
    private allTrafficAreas: TrafficArea[];

    constructor(
        private readonly broker: MessageBrokerService,
        private readonly service: TrafficService,
        private readonly logger: LoggingService
    ) {}

    async ngOnInit() {
        await this.fillTrafficAreaDropDown();
    }

    onFetchPosition() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                if (!this.allTrafficAreas) {
                    // Re-fetch traffic areas if needed
                    await this.fillTrafficAreaDropDown();
                }
                this.position.lat = position.coords.latitude;
                this.position.lng = position.coords.longitude;
                this.trafficArea = await this.service.fetchClosestTrafficAreaForPosition(this.position);
                await this.fetchMessages();
                this.selectedArea = this.trafficArea.trafficdepartmentunitid;
            },
            (error) => {
                this.broker.sendMessage(new ErrorOccurredMessage(error.message));
            }
        );
    }

    onShowUserOnMap() {
        this.broker.sendMessage(new ShowMapMessage([], this.position, 'Din position'));
    }

    onShowAllPositionsOnMap() {
        if (!this.messages) return;

        const positions: GeoPosition[] = [];
        this.messages
            .filter((m) => this.matchesKeyword(m) && this.matchesFilter(m))
            .forEach((m) => {
                const pos: GeoPosition = {
                    lat: m.latitude,
                    lng: m.longitude,
                    info: `${m.priorityName}: ${m.title} (${m.subCategory})`,
                    id: m.id
                };
                positions.push(pos);
            });
        if (positions.length == 0) return;

        let title = this.trafficArea?.name ? `Trafikområde: ${this.trafficArea.name}` : 'Alla trafikområden';
        this.broker.sendMessage(new ShowMapMessage(positions, this.position, title));
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

    async onAreaChanged(event) {
        this.keyword = '';
        if (event.value == 0) {
            this.trafficArea = null;
            await this.fetchMessages();
        } else {
            this.trafficArea = this.getAreaFromId(event.value);
            await this.fetchMessages();
        }
    }

    onSortOrderChanged() {
        this.sortMessages();
    }

    matchesFilter(message: TrafficMessageViewModel) {
        if (message.categoryName === TrafficMessagesComponent.OtherTransportCatName) {
            if (!this.includeCategoryOther) {
                return false;
            }
        }
        const now = new Date().getDate();
        if (message.createdDate.getDate() !== now) {
            if (this.showTodayOnly) {
                return false;
            }
        }
        if (this.showOnlyPublicTransport && message.categoryName !== TrafficMessagesComponent.PublicTransportCatName) {
            return false;
        }
        return true;
    }

    hasMessagesToDisplay(): boolean {
        if (!this.messages || this.messages.length < 1) return false;
        const messages = this.messages.filter((m) => this.matchesFilter(m) && this.matchesKeyword(m));
        return messages.length > 0;
    }

    private async fillTrafficAreaDropDown() {
        this.allTrafficAreas = await this.service.fetchAllTrafficAreas();
        this.areaOptions = [];
        this.areaOptions.push({ label: 'Alla', value: 0 });
        const categories = this.allTrafficAreas.map((c) => ({
            label: c.name,
            value: c.trafficdepartmentunitid
        }));
        this.areaOptions.push(...categories);
    }

    private getAreaFromId(unitid: number) {
        const area = this.allTrafficAreas.find((a) => a.trafficdepartmentunitid === unitid);
        return area;
    }

    private async fetchMessages() {
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
