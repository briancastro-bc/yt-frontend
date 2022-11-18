import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ThemeType } from '@shared/types';
import { LocalStorageService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly themeSubject$: BehaviorSubject<ThemeType> = new BehaviorSubject<ThemeType>(null!);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly localStorageService: LocalStorageService,
  ) { }

  initialize(): void {

    if(!this.currentTheme) {

      const userThemePreference = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
      if (userThemePreference?.matches) {
        this.localStorageService.setItem('user_theme', 'dark-theme');
      } else {
        this.localStorageService.setItem('user_theme', 'light-theme');
      }

      this.themeSubject$.next(this.currentTheme);

    }

    this.document.body.classList.add(this.currentTheme);
  }

  toggleTheme(): void {
    const nextTheme: ThemeType = this.currentTheme == 'dark-theme' ? 'light-theme' : 'dark-theme';
    switch (nextTheme) {
      case 'dark-theme': {
        this.document.body.classList.remove(this.currentTheme);
        this.document.body.classList.add('dark-theme');
        this.localStorageService.setItem('user_theme', 'dark-theme');
        break;
      }
      case 'light-theme': {
        this.document.body.classList.remove(this.currentTheme);
        this.document.body.classList.add('light-theme');
        this.localStorageService.setItem('user_theme', 'light-theme');
        break;
      }
    };
  }

  get currentTheme(): ThemeType {
    return this.localStorageService.getItem('user_theme').value as any;
  }

  get theme$(): Observable<ThemeType> {
    this.themeSubject$.next(this.currentTheme);
    return this.themeSubject$.asObservable();
  }
}
