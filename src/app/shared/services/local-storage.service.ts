import { Injectable } from '@angular/core';

import { CustomStorage } from '@core/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends CustomStorage {

  constructor() {
    super(localStorage);
  }
}
