import { Component, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Vector from 'ol/source/Vector';
import { Icon, Style, Text } from 'ol/style';
import OSM from 'ol/source/OSM';
import { GeoPosition } from 'src/app/models/geo-position';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    map: Map;
    defaultZoom = 13;
    markers: Feature[] = [];
    private readonly maxNumMarkers = 200;
    showLabels = false;
    positions: GeoPosition[];

    @Input('markerPos') set setMarkerPos(positions: GeoPosition[]) {
        this.positions = positions;
        this.updateMap(this.positions);
    }

    updateMap(positions: GeoPosition[]) {
        if (positions) {
            if (!this.map) {
                this.initilizeMap();
            }
            for (let i = 0; i < this.maxNumMarkers; i++) {
                this.markers[i].setGeometry(null);
            }
            const view = this.map.getView();
            if (positions.length > 1) {
                view.setZoom(6);
            } else {
                view.setZoom(this.defaultZoom);
            }
            for (let i = 0; i < Math.min(positions.length, this.maxNumMarkers); i++) {
                const pos = positions[i];
                this.markers[i].setGeometry(new Point(fromLonLat([pos.lng, pos.lat])));

                let label = '';
                if (this.showLabels) {
                    label = pos.info;
                }
                this.markers[i].setStyle(
                    new Style({
                        text: new Text({ text: label }),
                        image: new Icon({
                            crossOrigin: 'anonymous',
                            src: 'assets/clipart_med.png',
                            imgSize: [60, 60],
                            anchor: [0.5, 1],
                            opacity: 0.5,
                            scale: 0.5
                        })
                    })
                );
                if (i === 0) {
                    view.setCenter(fromLonLat([pos.lng, pos.lat]));
                }
            }
        }
    }
    initilizeMap(): void {
        this.markers = [];
        for (let i = 0; i < this.maxNumMarkers; i++) {
            let marker = new Feature({});
            this.markers.push(marker);
        }

        let vectorLayer = new VectorLayer({
            source: new Vector({
                features: this.markers
            })
        });

        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: this.defaultZoom
            })
        });
    }

    onShowLabelsChanged(checked) {
        this.updateMap(this.positions);
    }
}
