import { Component, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Vector from 'ol/source/Vector';
import { Fill, Icon, Style, Text } from 'ol/style';
import OSM from 'ol/source/OSM';
import { GeoPosition } from 'src/app/view-models/geo-position';

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
            this.markers[i].setGeometry(new Point(fromLonLat([pos.lng, pos.lat])));

            let label = this.showLabels ? pos.info : '';
            this.markers[i].setStyle(
                new Style({
                    text: new Text({
                        text: label,
                        font: 'bold 13px sans-serif',
                        backgroundFill: new Fill({ color: '#ffffff' }),
                        offsetY: -50,
                        fill: new Fill({ color: '#555588' })
                    }),
                    image: new Icon({
                        src: 'assets/marker.png',
                        imgSize: [60, 60],
                        anchor: [0.5, 1],
                        opacity: 0.7,
                        scale: 0.7
                    })
                })
            );
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
        //
        this.map = new Map({
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
    }
}
