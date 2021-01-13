import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/sv';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from './translations/translate.pipe';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoggingService } from './services/logging.service';
import { MessageBrokerService } from './services/message-broker.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { GMapModule } from 'primeng/gmap';
import { AppConfigService } from './services/app-config.service';

import { TrafficMessagesComponent } from './components/traffic-info/traffic-messages.component';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsService } from './services/googlemaps.service';
import { InfoCardComponent } from './components/traffic-info/info-card.component';
registerLocaleData(locale);

export function appConfigInit(configService: AppConfigService, googleMapService: GoogleMapsService, logging: LoggingService) {
    // Load the configuration and init google api if maps should be used
    return () => {
        return new Promise<void>((resolve) => {
            configService.load().then(() => {
                logging.logInfo('Started loading google maps');
                googleMapService.load(configService.googleAPIKey).then(() => {
                    logging.logInfo('Finished loading google maps');
                    resolve();
                });
            });
        });
    };
}

@NgModule({
    declarations: [AppComponent, TrafficMessagesComponent, TranslatePipe, MapComponent, InfoCardComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TableModule,
        ToolbarModule,
        FormsModule,
        BrowserAnimationsModule,
        SidebarModule,
        ToastModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        DropdownModule,
        GMapModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'sv' },

        GoogleMapsService,
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: appConfigInit,
            multi: true,
            deps: [AppConfigService, GoogleMapsService, LoggingService]
        },
        MessageService,
        LoggingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
            deps: [MessageBrokerService, LoggingService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
