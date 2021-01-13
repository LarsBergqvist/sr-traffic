import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrafficMessagesComponent } from './components/traffic-info/traffic-messages.component';

const routes: Routes = [{ path: '**', component: TrafficMessagesComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
