import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherComponent } from './weather/weather.component';
import { SharedModule } from './shared/shared.module';
import { InputComponent } from './input/input.component';
import { CitiesListComponent } from './cities-list/cities-list.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CitiesListComponent,
    InputComponent
],
  entryComponents: [],
  imports: [
    BrowserModule, 
    SharedModule,
    IonicModule.forRoot(),
    // RouterModule.forRoot(appRoutes),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
