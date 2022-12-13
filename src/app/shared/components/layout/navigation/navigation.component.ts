import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export interface Links {
  route: string;
  label: string;
}

@Component({
  selector: 'yt-navigation',
  template: `
    <div class="navigation">
      <nav class="navigation__links">
        <a class="navigation__links--link" *ngFor="let link of navigationLinks">
          |
          <span class="label">{{ link.label | translate }}</span>
        </a>
      </nav>
    </div>
  `,
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  readonly navigationLinks: Links[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.navigationLinks = [
      {
        route: '/',
        label: 'app.navigation.home.label',
      },
      {
        route: '/about',
        label: 'app.navigation.about.label',
      },
      {
        route: '/works',
        label: 'app.navigation.works.label',
      },
      {
        route: '/contact',
        label: 'app.navigation.contact.label',
      }
    ]
  }

  ngOnInit(): void {}
}
