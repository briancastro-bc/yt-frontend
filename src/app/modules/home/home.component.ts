import { Component, OnInit } from '@angular/core';

import { CustomDeviceDetectorService } from '@shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <app-home-desktop *ngIf="!(isMobile$ | async)"></app-home-desktop>
  `,
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly deviceDetector: CustomDeviceDetectorService,
  ) { }

  ngOnInit(): void {
  }

  get isMobile$(): Observable<boolean> {
    return this.deviceDetector.isMobile$;
  }
}
