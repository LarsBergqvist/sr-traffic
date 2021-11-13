import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ShowInfoSidebarMessage } from 'src/app/messages/show-info-sidebar.message';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { MapInput } from 'src/app/models/map-input';
import { MapDataService } from 'src/app/services/map-data.service';
import { MessageBrokerService } from 'src/app/services/message-broker.service';

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html'
})
export class MapSidebarComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    title: string;
    details: string;
    isVisible = false;

    constructor(private readonly broker: MessageBrokerService, private readonly mapDataService: MapDataService) {}

    ngOnInit() {
        this.broker
            .getMessage()
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((message) => message instanceof ShowMapMessage)
            )
            .subscribe((message: ShowMapMessage) => {
                const input = new MapInput();
                input.markerPosisitons = message.positions;
                input.userPos = message.userPos;
                this.title = message.title;
                this.details = message.details;
                this.isVisible = true;
                this.mapDataService.addNewMapInput(input);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(undefined);
        this.unsubscribe$.complete();
    }

    close() {
        this.isVisible = false;
    }

    onMapMarkerClicked(id: number) {
        this.broker.sendMessage(new ShowInfoSidebarMessage(id));
    }
}
