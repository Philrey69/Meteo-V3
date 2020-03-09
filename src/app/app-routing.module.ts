import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { InputComponent } from './input/input.component';
import { CitiesListComponent } from './cities-list/cities-list.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
// ];

const appRoutes: Routes = [
    {path: 'weather', component: WeatherComponent},
    {path: 'citylist', component: CitiesListComponent},
    {path: '', component: WeatherComponent},
    {path: '**', component: WeatherComponent}
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
