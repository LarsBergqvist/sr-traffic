import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SRBaseService {
    protected get BaseUrl(): string {
        return 'https://api.sr.se/api/v2/';
    }

    protected get FormatParam(): string {
        return 'format=json';
    }
}
