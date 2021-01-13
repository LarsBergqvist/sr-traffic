import { Injectable } from '@angular/core';
import * as loadGoogleMapsApi from 'load-google-maps-api';

@Injectable()
class GoogleMapsService {
    constructor() {}
    load(googleAPIKey: string): any {
        return loadGoogleMapsApi({ key: googleAPIKey, apiUrl: 'https://maps.googleapis.com/maps/api/js', libraries: ['geometry'] });
    }
}
export { GoogleMapsService };
