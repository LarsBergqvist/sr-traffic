import { Component, Input, OnInit } from '@angular/core';
import { ShowMapMessage } from 'src/app/messages/show-map.message';
import { Location } from 'src/app/models/location';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { TrafficMessageViewModel } from 'src/app/view-models/traffic-message-vm';

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
    styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
    @Input() message: TrafficMessageViewModel;
    @Input() zoom: number;

    constructor(private readonly broker: MessageBrokerService) {}

    ngOnInit(): void {}

    onClickMessage(message: TrafficMessageViewModel) {
        const location: Location = {
            latitude: message.latitude,
            longitude: message.longitude,
            name: message.title,
            zoom: this.zoom
        };
        this.broker.sendMessage(
            new ShowMapMessage(
                location,
                `${message.title} (${message.subCategory})`,
                message.description,
                message.exactLocation
            )
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
