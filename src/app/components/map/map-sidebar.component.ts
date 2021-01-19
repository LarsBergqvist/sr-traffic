import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { GeoPosition } from 'src/app/view-models/geo-position';
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
    markerPos: GeoPosition[];

    constructor(private readonly broker: MessageBrokerService) {}

    ngOnInit() {
        this.broker
            .getMessage()
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((message) => message instanceof ShowMapMessage)
            )
            .subscribe((message: ShowMapMessage) => {
                this.markerPos = message.positions;
                this.title = message.title;
                this.details = message.details;
                this.isVisible = true;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    close() {
        this.isVisible = false;
    }
}
