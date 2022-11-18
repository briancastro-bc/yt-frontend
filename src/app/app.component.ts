import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { LocalStorageService, ThemeService } from '@shared/services';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly translateService: TranslateService,
    private readonly localStorageService: LocalStorageService,
    private readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.initializeLanguage();
    this.themeService.initialize();
  }

  initializeLanguage(): void {
    if(!this.language) {
      const userLanguage = this.document.defaultView?.navigator.language.split("-");
      this.localStorageService.setItem('user_language', userLanguage![0]);
    }

    this.translateService.use(this.language);
  }

  ngOnDestroy(): void {}

  get language(): string {
    return this.localStorageService.getItem('user_language').value as string;
  }
}
