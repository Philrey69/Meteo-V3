import { Component, OnInit } from '@angular/core';
import { City } from '../shared/models/city.model';
import { WeatherService } from '../shared/services/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FavoriteService } from '../shared/services/favorite.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss'],
})
export class CitiesListComponent implements OnInit {
  
    private citiesList: string[] = []
    private city: City
    private nomVar: string

  constructor(
    private favoriteService: FavoriteService,
    private weatherService: WeatherService,
    private router: Router
  ) { 
   
    this.load();
  }

load() {
  let index = localStorage.getItem("index")
    if (!index) {
      index = "-1"
    } 
    for (let i = 0 ; i <= parseInt(index); i++) {
      this.nomVar = "ville"+i.toString();
      this.citiesList[i] = localStorage.getItem(this.nomVar);
      this.citiesList[i+1] = "";
    };
}

go(town: string) {
  this.weatherService.retrieveWeatherByName(town)
  .then((city: City) => {
    this.city = city;
    this.router.navigate(['/weather']);

  })
  .catch((error: HttpErrorResponse) => {
    ;
  });
}


delete(town:string) {
  this.favoriteService.delete(town);
  this.load();
}

goBack(){
  
}
  
  ngOnInit() {}

}
