import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { GeoPosition } from 'src/app/models/geo-position';
import { MessageBrokerService } from 'src/app/services/message-broker.service';

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html'
})
export class MapSidebarComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    title: string;
    positionInfo: string;
    details: string;
    isVisible = false;
    markerPos: GeoPosition;

    close() {
        this.isVisible = false;
    }

    constructor(private readonly broker: MessageBrokerService) {}

    ngOnInit() {
        this.broker
            .getMessage()
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((message) => message instanceof ShowMapMessage)
            )
            .subscribe((message: ShowMapMessage) => {
                this.markerPos = message.position;
                this.title = message.title;
                this.details = message.details;
                this.positionInfo = message.positionInfo;
                this.isVisible = true;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
