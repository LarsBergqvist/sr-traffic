import { Component, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Vector from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { GeoPosition } from 'src/app/view-models/geo-position';
import { Attribution, defaults as defaultControls } from 'ol/control';
import Select, { SelectEvent } from 'ol/interaction/Select';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { ShowInfoSidebarMessage } from 'src/app/messages/show-info-sidebar.message';
import { click } from 'ol/events/condition';
import { styleMarker, styleMarkersAsDeselected, styleUser } from './map-functions';

export class MapInput {
    markerPosisitons: GeoPosition[];
    userPos: GeoPosition;
}

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    map: Map;

    private static readonly MaxNumMarkers = 200;
    private static readonly ZoomLevelSingleMarker = 13;
    private static readonly ZoomLevelSeveralMarkers = 6;
    private markers: Feature[] = [];
    private userMarker: Feature;
    private positions: GeoPosition[];
    private userPos: GeoPosition;

    @Input('mapInput') set setInputData(input: MapInput) {
        if (!input) return;
        this.setupMap(input);
    }

    constructor(private readonly broker: MessageBrokerService) {}

    private setupMap(input: MapInput) {
        this.positions = input.markerPosisitons;
        this.userPos = input.userPos;

        if (!this.map) {
            this.initilizeMap();
        }

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

        this.setupMarkerClickHandler(markersLayer);
    }

    private setupMarkerClickHandler(markersLayer: VectorLayer) {
        //
        // Setup handler for clicks on markers
        // Use SelectEvent with toggle mode to act on each
        // click on a marker
        //
        let selectSingleClick: any = new Select({
            style: null,
            condition: click,
            toggleCondition: () => true,
            layers: [markersLayer]
        });
        this.map.addInteraction(selectSingleClick);
        selectSingleClick.on('select', (e: SelectEvent) => {
            styleMarkersAsDeselected(this.markers);
            let id = null;
            let markers = null;
            if (e.selected && e.selected.length > 0) {
                markers = e.selected;
            } else if (e.deselected && e.deselected.length > 0) {
                markers = e.deselected;
                id = e.deselected[0].getId();
                styleMarker(e.deselected[0], true);
                this.broker.sendMessage(new ShowInfoSidebarMessage(id));
            }
            if (markers) {
                const marker = markers[0];
                styleMarker(marker, true);
                id = marker.getId();
                this.broker.sendMessage(new ShowInfoSidebarMessage(id));
            }
        });
    }
}
