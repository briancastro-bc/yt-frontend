import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomDeviceDetectorService extends DeviceDetectorService {

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    super(platformId);
  }

  get isMobile$(): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      return this.isMobile() ? subscriber.next(true) : subscriber.next(false);
    });
  }

  get isDesktop$(): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      return this.isDesktop() ? subscriber.next(true) : subscriber.next(false);
    });
  }

  get isTablet$(): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      return this.isTablet() ? subscriber.next(true) : subscriber.next(false);
    });
  }
}
