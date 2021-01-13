import { Injectable } from '@angular/core';
import res_en from '../translations/res-en.json';
import res_sv from '../translations/res-sv.json';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private fallBackLangCode: string;
    private currLangCode: string;
    private localeToUse: string;

    private readonly translations = {
        en: res_en,
        sv: res_sv
    };

    public set defaultLangCode(langCode: string) {
        this.fallBackLangCode = langCode;
    }

    public set currentLocale(locale: string) {
        this.localeToUse = locale;
        this.currLangCode = this.localeToUse.slice(0, 2);
    }

    private translate(key: string): string {
        if (this.translations[this.currLangCode] && this.translations[this.currLangCode][key]) {
            const result = this.translations[this.currLangCode][key];
            if (result !== '') {
                return result;
            }
        }

        if (this.translations[this.fallBackLangCode] && this.translations[this.fallBackLangCode][key]) {
            const result = this.translations[this.fallBackLangCode][key];
            if (result === '') {
                return key;
            } else {
                return result;
            }
        }
        return key;
    }

    public translateWithArgs(key: string, args?: string | string[]) {
        const trans: string = this.translate(key);
        if (!args) return trans;
        return this.replace(trans, args);
    }

    private replace(word: string = '', words: string | string[] = '') {
        let trans: string = word;

        const values: string[] = [].concat(words);
        values.forEach((e, i) => {
            e = e.replace(/\$/g, '$$$$');
            trans = trans.replace('{'.concat(<any>i) + '}', e);
        });
        return trans;
    }
}
