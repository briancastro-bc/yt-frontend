import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { CustomStorage } from '@core/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends CustomStorage {

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    super(document.defaultView!.localStorage);
  }
}
