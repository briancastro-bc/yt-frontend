import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  SecurityContext,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { ThemeType, SocialMediaType, LanguageType, } from '@shared/types';
import { LocalStorageService, ThemeService } from '@shared/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'yt-navbar-desktop',
  templateUrl: './navbar.desktop.component.html',
  styleUrls: ['./navbar.desktop.component.scss'],
})
export class NavbarDesktopComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly allowedRedirects = environment.allowedRedirects;

  @ViewChild('navbar') navbarEl!: ElementRef<HTMLElement>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly renderer2: Renderer2,
    private readonly sanitizer: DomSanitizer,
    private readonly localStorage: LocalStorageService,
    private readonly themeService: ThemeService,
    private readonly translateService: TranslateService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  @HostListener('window:scroll', ['$event']) onScroll(event: any): void {
    this.onScrollingNavbar(event);
  }

  switchTheme(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(): void {
    switch (this.language) {
      case 'en': {
        this.translateService.use('es');
        this.localStorage.setItem('user_language', 'es');
        break;
      }
      case 'es': {
        this.translateService.use('en')
        this.localStorage.setItem('user_language', 'en');
        break;
      }
    }
  }

  secureRedirect(socialMedia: SocialMediaType): void {
    const isAllowedSocialMediaRedirect = socialMedia in this.allowedRedirects;
    if (!isAllowedSocialMediaRedirect) return;

    const secureUrl = this.sanitizer.sanitize(SecurityContext.URL, this.sanitizer.bypassSecurityTrustUrl(this.allowedRedirects[socialMedia]));

    this.document.defaultView?.open(secureUrl!, '_blank');
  }

  ngOnDestroy(): void { }

  private onScrollingNavbar(event: Event): void {
    if (this.document.defaultView!.scrollY > this.navbarEl.nativeElement.clientHeight) {
      this.renderer2.addClass(this.navbarEl.nativeElement, 'navbar__scrolling');
      this.renderer2.addClass(this.navbarEl.nativeElement, 'yt-glassmorphism');
    } else {
      this.renderer2.removeClass(this.navbarEl.nativeElement, 'navbar__scrolling');
      this.renderer2.removeClass(this.navbarEl.nativeElement, 'yt-glassmorphism');
    }
  }

  get language(): LanguageType {
		return this.localStorage.getItem('user_language').value;
	}

  get currentTheme$(): Observable<ThemeType> {
    return this.themeService.theme$;
  }

  get currentLanguage$(): Observable<{ flagSrc: string, label: string }> {
    const language = this.localStorage.getItem('user_language').value as LanguageType;
    return new Observable<any>(subscriber => {
      subscriber.next({
        flagSrc: `assets/images/${language}.png`,
        label: language,
      });
    })
  }
}
