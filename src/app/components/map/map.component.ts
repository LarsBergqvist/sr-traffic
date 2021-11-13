import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Attribution, defaults as defaultControls } from 'ol/control';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import View from 'ol/View';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapInput } from 'src/app/models/map-input';
import { MapDataService } from 'src/app/services/map-data.service';
import { GeoPosition } from 'src/app/view-models/geo-position';
import { setupMarkerClickHandler, styleMarker, styleUser } from './map-functions';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {
    map: Map;

    private static readonly MaxNumMarkers = 200;
    private static readonly ZoomLevelSingleMarker = 13;
    private static readonly ZoomLevelSeveralMarkers = 6;
    private markers: Feature[] = [];
    private userMarker: Feature;
    private positions: GeoPosition[];
    private userPos: GeoPosition;
    private unsubscribe$ = new Subject();

    constructor(private readonly mapDataService: MapDataService) {}

    ngAfterViewInit(): void {
        if (!this.map) {
            this.initilizeMap();
        }

        this.mapDataService.mapInput$.pipe(takeUntil(this.unsubscribe$)).subscribe((value: MapInput) => {
            if (value) {
                this.setupMap(value);
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next(undefined);
        this.unsubscribe$.complete();
    }

    @Output() onMarkerClicked = new EventEmitter<number>();

    private setupMap(input: MapInput) {
        this.positions = input.markerPosisitons;
        this.userPos = input.userPos;

        const view = this.map.getView();
        if (this.positions.length > 0) {
            view.setCenter(fromLonLat([this.positions[0].lng, this.positions[0].lat]));
        } else if (this.userPos && this.userPos.lat && this.userPos.lng) {
            view.setCenter(fromLonLat([this.userPos.lng, this.userPos.lat]));
        }

        const zoomLevel =
            this.positions.length < 2 ? MapComponent.ZoomLevelSingleMarker : MapComponent.ZoomLevelSeveralMarkers;
        view.setZoom(zoomLevel);

        this.updateMarkers(this.positions, true);
        this.updateUserMarker(this.userPos);
    }

    private updateUserMarker(userPos: GeoPosition) {
        this.userPos = userPos;
        this.userMarker.setGeometry(null);
        if (!userPos) return;

        this.userMarker.setGeometry(new Point(fromLonLat([userPos.lng, userPos.lat])));
        styleUser(this.userMarker);
    }

    private updateMarkers(positions: GeoPosition[], resetZoom: boolean) {
        // Clear all marker placeholders
        for (let i = 0; i < MapComponent.MaxNumMarkers; i++) {
            this.markers[i].setGeometry(null);
        }
        this.positions = positions;
        if (!positions) return;

        //
        // Create a marker for each geo-position
        //
        for (let i = 0; i < Math.min(positions.length, MapComponent.MaxNumMarkers); i++) {
            const pos = positions[i];
            const marker = this.markers[i];
            marker.setId(pos.id);
            marker.setGeometry(new Point(fromLonLat([pos.lng, pos.lat])));
            marker.setProperties({ info: pos.info });
            styleMarker(marker, false);
        }
    }

    private initilizeMap(): void {
        //
        // Create placeholders for markers
        //
        this.markers = [];
        for (let i = 0; i < MapComponent.MaxNumMarkers; i++) {
            this.markers.push(new Feature({}));
        }

        this.userMarker = new Feature();

        //
        // Create a map with an OpenStreetMap-layer,
        // a marker layer and a view
        var attribution = new Attribution({
            // Attach the attribution information
            // to an element outside of the map
            target: 'attribution'
        });
        const markersLayer = new VectorLayer({
            source: new Vector({ features: this.markers })
        });
        this.map = new Map({
            controls: defaultControls({ attribution: false }).extend([attribution]),
            target: 'map',
            layers: [
                new TileLayer({ source: new OSM() }),
                markersLayer,
                new VectorLayer({
                    source: new Vector({ features: [this.userMarker] })
                })
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: MapComponent.ZoomLevelSingleMarker
            })
        });

        setupMarkerClickHandler(this.map, markersLayer, this.markers, (id) => this.onMarkerClicked.emit(id));
    }
}
