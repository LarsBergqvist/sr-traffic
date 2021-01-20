import Feature from 'ol/Feature';
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
