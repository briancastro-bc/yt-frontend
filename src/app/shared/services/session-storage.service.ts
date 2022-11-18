import { Injectable } from '@angular/core';

import { CustomStorage } from '@core/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends CustomStorage {

  constructor() {
    super(sessionStorage);
  }
}
