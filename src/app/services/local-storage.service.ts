import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    localStorage: Storage;

    constructor() {
        this.localStorage = window.localStorage;
    }

    get<T>(key: string): T {
        if (this.isSupported) {
            const item = this.localStorage.getItem(key);
            if (item) {
                try {
                    return JSON.parse(item);
                } catch {}
            }
        }
        return null;
    }

    set(key: string, value: any): boolean {
        if (this.isSupported) {
            this.localStorage.setItem(key, JSON.stringify(value));

            return true;
        }
        return false;
    }

    get isSupported(): boolean {
        return !!this.localStorage;
    }
}
