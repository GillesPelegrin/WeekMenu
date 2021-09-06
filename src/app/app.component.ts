import {Component} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(evt => {
      window.location.reload();
    });
  }
}
