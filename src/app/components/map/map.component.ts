import { Component, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import { Location } from 'src/app/models/location';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent {
    map: Map;
    marker: Feature;
    defaultZoom = 13;

    @Input('location') set setLocation(loc: Location) {
        if (loc) {
            if (!this.map) {
                this.initilizeMap();
            }
            const view = this.map.getView();
            view.setCenter(fromLonLat([loc.longitude, loc.latitude]));
            view.setZoom(this.defaultZoom);
            this.marker.setGeometry(new Point(fromLonLat([loc.longitude, loc.latitude])));
        }
    }

    initilizeMap(): void {
        let vectorSource: VectorSource;
        let vectorLayer: VectorLayer;

        this.marker = new Feature({
            geometry: new Point(fromLonLat([0, 0]))
        });

        this.marker.setStyle(
            new Style({
                image: new Icon({
                    color: '#8959A8',
                    crossOrigin: 'anonymous',
                    src: 'assets/clipart_med.png',
                    imgSize: [60, 60],
                    anchor: [0.5, 1]
                })
            })
        );
        vectorSource = new VectorSource({
            features: [this.marker]
        });

        vectorLayer = new VectorLayer({
            source: vectorSource
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
}
