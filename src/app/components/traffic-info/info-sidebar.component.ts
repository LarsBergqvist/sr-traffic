import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ShowInfoSidebarMessage } from 'src/app/messages/show-info-sidebar.message';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { TrafficService } from 'src/app/services/traffic.service';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';

@Component({
    selector: 'app-info-sidebar',
    templateUrl: './info-sidebar.component.html'
})
export class InfoSideBarComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    isVisible = false;
    trafficMessage: TrafficMessageViewModel;

    constructor(private readonly broker: MessageBrokerService, private readonly service: TrafficService) {}

    ngOnInit() {
        this.broker
            .getMessage()
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((message) => message instanceof ShowInfoSidebarMessage)
            )
            .subscribe((message: ShowInfoSidebarMessage) => {
                this.trafficMessage = this.service.getCachedMessageFromId(message.id);
                if (this.trafficMessage) {
                    this.isVisible = true;
                }
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
