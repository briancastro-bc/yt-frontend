import { Component } from "@angular/core";

import { CustomDeviceDetectorService } from "@shared/services";
import { Observable } from "rxjs";

@Component({
  selector: 'app-blueprint',
  template: `
    <yt-navbar-mobile *ngIf="(isMobile$ | async)"></yt-navbar-mobile>
    <yt-navbar-desktop *ngIf="!(isMobile$ | async)"></yt-navbar-desktop>

    <main id="main-content">
      <router-outlet></router-outlet>
    </main>

    <yt-navigation></yt-navigation>
  `,
  styleUrls: ['./blueprint.component.scss'],
})
export class BlueprintComponent {

  constructor(
    private readonly deviceDetector: CustomDeviceDetectorService,
  ) { }

  get isMobile$(): Observable<boolean> {
    return this.deviceDetector.isMobile$;
  }
}
