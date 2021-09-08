import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SettingComponent} from "./components/setting/setting.component";
import {ModalComponent} from "./modal/modal.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MenuComponent} from "./components/menu/menu.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SettingComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  entryComponents: [SettingComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
