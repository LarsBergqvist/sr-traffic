import { Component, Input, OnInit } from '@angular/core';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { GeoPosition } from 'src/app/models/geo-position';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
    @Input() message: TrafficMessageViewModel;

    constructor(private readonly broker: MessageBrokerService) {}

    ngOnInit(): void {}

    onClickMessage(message: TrafficMessageViewModel) {
        const pos: GeoPosition = {
            lat: message.latitude,
            lng: message.longitude,
            info: message.exactLocation
        };
        const positions: GeoPosition[] = [];
        positions.push(pos);
        this.broker.sendMessage(
            new ShowMapMessage(positions, `${message.title} (${message.subCategory})`, message.description)
        );
    }

    getStyleClassForPriority(prio: number): string {
        let style = 'priority-ctn';
        switch (prio) {
            case 1:
                style += ' prio-highest';
                break;
            case 2:
                style += ' prio-higher';
                break;
            case 3:
                style += ' prio-high';
                break;
            default:
                style += ' prio-info';
        }

        return style;
    }
}
