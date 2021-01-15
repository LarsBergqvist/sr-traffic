import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/sv';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from './translations/translate.pipe';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoggingService } from './services/logging.service';
import { MessageBrokerService } from './services/message-broker.service';
import { DropdownModule } from 'primeng/dropdown';

import { TrafficMessagesComponent } from './components/traffic-info/traffic-messages.component';
import { MapComponent } from './components/map/map.component';
import { InfoCardComponent } from './components/traffic-info/info-card.component';
import { DetailsComponent } from './components/map/details.component';
import { FormsModule } from '@angular/forms';
registerLocaleData(locale);

@NgModule({
    declarations: [MapComponent, AppComponent, TrafficMessagesComponent, TranslatePipe, DetailsComponent, InfoCardComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ToolbarModule,
        BrowserAnimationsModule,
        SidebarModule,
        ToastModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'sv' },
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
