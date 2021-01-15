import { Injectable } from '@angular/core';
import * as loadGoogleMapsApi from 'load-google-maps-api';

declare var google: any;

@Injectable()
class GoogleMapsService {
    constructor() {}
    load(googleAPIKey: string): any {
        return loadGoogleMapsApi({ key: googleAPIKey, apiUrl: 'https://maps.googleapis.com/maps/api/js', libraries: ['geometry'] });
    }

    calcDistanceKm(fromLat: number, fromLng: number, toLat: number, toLng: number): number {
        if (!google) return null;
        var dist = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(fromLat, fromLng),
            new google.maps.LatLng(toLat, toLng)
        );
        return Math.round(dist / 1000);
    }
}
export { GoogleMapsService };
