import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UpdateMapMessage } from 'src/app/messages/update-map.message';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { Location } from '../../models/location';

declare var google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html'
})
export class MapComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    isVisible = false;
    location: Location;
    options: any;
    overlays: any;
    map: any;
    readonly defaultPosition = { lat: 51.477847, lng: 0.0 };
    readonly defaultZoom = 15;

    updateLocation(loc: Location) {
        console.log('loc: ' + loc.latitude);
        if (loc && this.map) {
            console.log('loc: ' + loc.latitude);
            // Work with the google map object directly as modifying gmap's options
            // will not update the map
            this.map.setZoom(loc.zoom);
            this.map.setCenter({ lat: loc.latitude, lng: loc.longitude });
            this.overlays = [
                new google.maps.Marker({
                    position: { lat: loc.latitude, lng: loc.longitude },
                    title: loc.name
                })
            ];
        }
    }

    close() {
        this.isVisible = false;
    }

    constructor(private readonly broker: MessageBrokerService) {}

    onMapReady(event: any) {
        if (event.map) {
            this.map = event.map;
            if (this.location) {
                this.updateLocation(this.location);
            }
        }
    }

    handleMapClick(event) {}

    ngOnInit() {
        const messages = this.broker.getMessage();
        messages
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((message) => message instanceof UpdateMapMessage)
            )
            .subscribe((message: UpdateMapMessage) => {
                this.location = message.location;
                this.updateLocation(message.location);
                this.isVisible = true;
            });

        this.options = {
            center: this.defaultPosition,
            zoom: this.defaultZoom
        };
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    get useMap(): boolean {
        return true;
    }
}
