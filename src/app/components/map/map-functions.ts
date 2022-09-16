import { click } from 'ol/events/condition';
import Feature from 'ol/Feature';
import Select, { SelectEvent } from 'ol/interaction/Select';
import Map from 'ol/Map';
import { Fill, Icon, Style, Text } from 'ol/style';

export function styleMarkersAsDeselected(features: Feature[]) {
    if (!features) return;
    features.forEach((f) => {
        styleMarker(f, false);
    });
}

export function styleMarker(feature: Feature, asSelected: boolean) {
    if (!feature) return;

    var props = feature.getProperties();
    const label = props['info'] && asSelected ? props['info'] : '';
    const image = asSelected ? 'assets/marker_blue.png' : 'assets/marker.png';
    feature.setStyle(
        new Style({
            text: new Text({
                text: label,
                font: 'bold 13px sans-serif',
                backgroundFill: new Fill({ color: '#ffffff' }),
                offsetY: -50,
                fill: new Fill({ color: '#555588' })
            }),
            image: new Icon({
                src: image,
                imgSize: [60, 60],
                anchor: [0.5, 1],
                opacity: 0.7,
                scale: 0.7
            })
        })
    );
}

export function styleUser(feature: Feature) {
    if (!feature) return;

    feature.setStyle(
        new Style({
            image: new Icon({
                src: 'assets/user.png',
                imgSize: [60, 60],
                anchor: [0.5, 1],
                opacity: 0.7,
                scale: 0.5
            })
        })
    );
}

export interface CallBackOnClickFunction {
    (num: number): void;
}

export function setupMarkerClickHandler(
    map: Map,
    markersLayer: any,
    allMarkers: Feature[],
    callbackOnClick: CallBackOnClickFunction
) {
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
    map.addInteraction(selectSingleClick);
    selectSingleClick.on('select', (e: SelectEvent) => {
        styleMarkersAsDeselected(allMarkers);
        let markers = null;
        if (e.selected && e.selected.length > 0) {
            markers = e.selected;
        } else if (e.deselected && e.deselected.length > 0) {
            markers = e.deselected;
        }
        if (markers) {
            const marker = markers[0];
            styleMarker(marker, true);
            callbackOnClick(marker.getId());
        }
    });
}
