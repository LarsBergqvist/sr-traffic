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
import Select from 'ol/interaction/Select';
import { FeatureHelper } from './feature-helper';
import { MessageBrokerService } from 'src/app/services/message-broker.service';
import { ShowInfoSidebarMessage } from 'src/app/messages/show-info-sidebar.message';
import { click } from 'ol/events/condition';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    map: Map;
    showLabels = false;

    private static readonly MaxNumMarkers = 200;
    private static readonly ZoomLevelSingleMarker = 13;
    private static readonly ZoomLevelSeveralMarkers = 6;
    private markers: Feature[] = [];
    private positions: GeoPosition[];

    @Input('markerPos') set setMarkerPos(positions: GeoPosition[]) {
        this.positions = positions;
        this.updateMarkers(this.positions, true);
    }

    constructor(private readonly broker: MessageBrokerService) {}

    onShowLabelsChanged(checked) {
        this.updateMarkers(this.positions, false);
    }

    private updateMarkers(positions: GeoPosition[], resetZoom: boolean) {
        if (!positions || positions.length === 0) return;

        const zoomLevel =
            positions.length === 1 ? MapComponent.ZoomLevelSingleMarker : MapComponent.ZoomLevelSeveralMarkers;

        if (!this.map) {
            this.initilizeMap();
        }

        // Clear all marker placeholders
        for (let i = 0; i < MapComponent.MaxNumMarkers; i++) {
            this.markers[i].setGeometry(null);
        }

        const view = this.map.getView();
        if (resetZoom) {
            view.setZoom(zoomLevel);
        }

        //
        // Create a marker for each geo-position
        //
        for (let i = 0; i < Math.min(positions.length, MapComponent.MaxNumMarkers); i++) {
            const pos = positions[i];
            const marker = this.markers[i];
            marker.setId(pos.id);
            marker.setGeometry(new Point(fromLonLat([pos.lng, pos.lat])));
            marker.setProperties({ info: pos.info });
            FeatureHelper.styleFeature(marker, this.showLabels);

            if (i === 0 && resetZoom) {
                view.setCenter(fromLonLat([pos.lng, pos.lat]));
            }
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

        //
        // Create a map with an OpenStreetMap-layer,
        // a marker layer and a view
        var attribution = new Attribution({
            // Attach the attribution information
            // to an element outside of the map
            target: 'attribution'
        });
        this.map = new Map({
            controls: defaultControls({ attribution: false }).extend([attribution]),
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new VectorLayer({
                    source: new Vector({
                        features: this.markers
                    })
                })
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: MapComponent.ZoomLevelSingleMarker
            })
        });

        //
        // Setup handler for clicks on markers
        //
        let selectSingleClick: any = new Select({ style: null, condition: click, toggleCondition: () => true });
        this.map.addInteraction(selectSingleClick);
        selectSingleClick.on('select', (e) => {
            let id = null;
            if (e.selected && e.selected.length > 0) {
                id = e.selected[0].getId();
                this.broker.sendMessage(new ShowInfoSidebarMessage(id));
            } else if (e.deselected && e.deselected.length > 0) {
                id = e.deselected[0].getId();
                this.broker.sendMessage(new ShowInfoSidebarMessage(id));
            }
        });
    }
}
