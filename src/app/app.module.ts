import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import * as Services from '../services/index';

// import { HttpInterceptor } from '../services/httpInterceptor';
// import { FourSquareService } from '../services/fourSquareService';
// import { MapsService } from '../services/mapService';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule' }
    ]),
    HttpModule,
    TransferHttpCacheModule,
  ],
  providers: [Services.HttpInterceptor, Services.FourSquareService, Services.MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
