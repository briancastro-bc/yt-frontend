import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@shared/material.module';
import { NavbarDesktopComponent, NavbarMobileComponent, NavigationComponent } from '@shared/components'
import { RippleDirective } from '@shared/directives';

@NgModule({
  declarations: [
    RippleDirective,
    NavigationComponent,
    NavbarDesktopComponent,
    NavbarMobileComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
  ],
  exports: [
    RippleDirective,
    NavigationComponent,
    NavbarDesktopComponent,
    NavbarMobileComponent,
    MaterialModule,
    TranslateModule,
  ]
})
export class SharedModule { }
