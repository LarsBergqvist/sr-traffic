import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from './translations/translate.pipe';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoggingService } from './services/logging.service';
import { MessageBrokerService } from './services/message-broker.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TrafficMessagesComponent } from './components/traffic-info/traffic-messages.component';
import { MapComponent } from './components/map/map.component';
import { InfoCardComponent } from './components/traffic-info/info-card.component';
import { FormsModule } from '@angular/forms';
import { MapSidebarComponent } from './components/map/map-sidebar.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    declarations: [
        MapComponent,
        AppComponent,
        TrafficMessagesComponent,
        TranslatePipe,
        MapSidebarComponent,
        InfoCardComponent
    ],
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
        InputTextModule,
        CheckboxModule,
        RadioButtonModule,
        AccordionModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    providers: [
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
