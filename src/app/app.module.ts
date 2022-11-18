import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DeviceDetectorService } from 'ngx-device-detector';

import { environment } from '@environment/environment';
import { SharedModule } from '@shared/shared.module';
import { CustomDeviceDetectorService } from '@shared/services';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BlueprintComponent } from '@app/blueprint/blueprint.component';

export function HttpLoaderFactory(handler: HttpBackend) {
  const http: HttpClient = new HttpClient(handler);
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BlueprintComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
      defaultLanguage: 'en',
      useDefaultLang: true,
    }),
    SharedModule,
  ],
  providers: [
    {
      provide: DeviceDetectorService,
      useClass: CustomDeviceDetectorService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
