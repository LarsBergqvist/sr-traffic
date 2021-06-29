import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ErrorOccurredMessage } from 'src/app/messages/error-occurred.message';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { GeoPosition } from 'src/app/view-models/geo-position';
import { TrafficArea } from 'src/app/models/traffic-area';
import { LoggingService } from 'src/app/services/logging.service';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { Category, SubCategory, TrafficService } from 'src/app/services/traffic.service';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { calcDistanceKm } from 'src/app/utils/distance-helper';

enum SortOrder {
    highestPriority = '1',
    leastDistance = '2',
    latestDate = '3'
}

class AppSettings {
    showTodayOnly: boolean;
    showPublicTransportOnly: boolean;
    showTrafficIncidentsOnly: boolean;
    includeSubcategoryRoadwork: boolean;
    showRoadTrafficOnly: boolean;
}

@Component({
    selector: 'app-messages',
    templateUrl: './traffic-messages.component.html',
    styleUrls: ['./traffic-messages.component.scss']
})
export class TrafficMessagesComponent implements OnInit {
    settings: AppSettings = {
        showTodayOnly: false,
        showRoadTrafficOnly: false,
        showPublicTransportOnly: false,
        showTrafficIncidentsOnly: false,
        includeSubcategoryRoadwork: false
    };

    sortOrder: SortOrder = SortOrder.highestPriority;
    selectedArea: number;

    private readonly AppSettingsKey = 'srtrafficsettings';
    private readonly radiusKm = 100;

    isLoading = false;
    showOnlyWithinRadius = false;

    position: GeoPosition = {
        lng: undefined,
        lat: undefined,
        info: undefined,
        id: undefined
    };

    messages: TrafficMessageViewModel[];

    areaOptions: SelectItem[];

    keyword = '';

    private trafficArea: TrafficArea;
    private allTrafficAreas: TrafficArea[];

    geolocationAvailable = false;

    constructor(
        private readonly broker: MessageBrokerService,
        private readonly service: TrafficService,
        private readonly logger: LoggingService,
        private readonly localStorageService: LocalStorageService
    ) {}

    async ngOnInit() {
        this.geolocationAvailable = 'geolocation' in navigator;
        const settings = this.localStorageService.get<AppSettings>(this.AppSettingsKey);
        if (settings) {
            this.settings = settings;
        } else {
            this.logger.logInfo('No previous settings found');
        }

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
                this.selectedArea = this.trafficArea.trafficdepartmentunitid;
                await this.fetchMessages();
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

        let title = this.trafficArea?.name ? `Trafikområde: ${this.trafficArea.name}` : 'Hela Sverige';
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

    async onRefresh() {
        await this.fetchMessages();
    }

    onSortOrderChanged() {
        this.sortMessages();
    }

    numFilteredMessagesInfo(): string {
        if (!this.messages || this.messages.length < 1) return '';
        const numMessages = this.messages.filter((m) => this.matchesFilter(m) && this.matchesKeyword(m)).length;
        const numStr = numMessages === 0 ? 'Inga' : `${numMessages}`;
        const info = numMessages === 1 ? `1 meddelande` : `${numStr} meddelanden`;
        return info;
    }

    onClear() {
        this.keyword = '';
    }

    matchesFilter(message: TrafficMessageViewModel) {
        if (message.category === Category.Övrigt) return false;

        if (message.category !== Category.Vägtrafik && this.settings.showRoadTrafficOnly) {
            return false;
        }

        if (message.subCategory !== SubCategory.TrafikOlycka) {
            if (this.settings.showTrafficIncidentsOnly) {
                return false;
            }
        }
        if (message.subCategory === SubCategory.Vägarbete) {
            if (!this.settings.includeSubcategoryRoadwork) {
                return false;
            }
        }
        const now = new Date().getDate();
        if (message.createdDate.getDate() !== now) {
            if (this.settings.showTodayOnly) {
                return false;
            }
        }
        if (this.settings.showPublicTransportOnly && message.category !== Category.Kollektivtrafik) {
            return false;
        }

        if (this.showOnlyWithinRadius && this.position && this.position.lat && this.position.lng) {
            const distanceKm = calcDistanceKm(
                this.position.lat,
                this.position.lng,
                message.latitude,
                message.longitude
            );
            if (distanceKm > this.radiusKm) {
                return false;
            }
        }
        return true;
    }

    hasMessagesToDisplay(): boolean {
        if (!this.messages || this.messages.length < 1) return false;
        const messages = this.messages.filter((m) => this.matchesFilter(m) && this.matchesKeyword(m));
        return messages.length > 0;
    }

    onCheckChanged() {
        this.localStorageService.set(this.AppSettingsKey, this.settings);
    }

    private async fillTrafficAreaDropDown() {
        this.allTrafficAreas = await this.service.fetchAllTrafficAreas();
        this.areaOptions = [];
        this.areaOptions.push({ label: 'Hela Sverige', value: 0 });
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
