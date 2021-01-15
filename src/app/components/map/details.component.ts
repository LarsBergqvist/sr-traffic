import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { Location } from '../../models/location';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    title: string;
    exactLocation: string;
    details: string;
    isVisible = false;
    location: Location;

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
                this.location = message.location;
                this.title = message.title;
                this.details = message.details;
                this.exactLocation = message.exactLocation;
                this.isVisible = true;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
