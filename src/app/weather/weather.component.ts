import { Component, OnInit, AfterViewInit } from '@angular/core';
import { City } from '../shared/models/city.model';
import { CityService } from '../shared/services/city.service';
import { WeatherService } from '../shared/services/weather.service';
import { FavoriteService } from '../shared/services/favorite.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {

  private city: City;
  private color: string;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private favoriteService: FavoriteService
    
  ) {

  }

  ngOnInit() {
    if (!this.city) {
      this.city = this.cityService.create();
      this.city.name = localStorage.getItem("city")
      if (!this.city.name) {
        this.localisation();
      } else {
        this.weatherService.retrieveWeatherByName(this.city.name)
          .then((city: City) => {
            this.city = city;
          })
      }
    }
  }

  public setCityValue(city: City) {
    this.city = city;
    if (this.favoriteService.find(this.city.name) != -1) {
      this.city.favorite = true;
    } else {
      this.city.favorite = false;
    }
  }

  public topFavorite() {
    if (this.city.favorite) {
      this.favoriteService.delete(this.city.name);
      this.city.favorite = false;
    } else {
      this.favoriteService.add(this.city);
      this.city.favorite = true;
    }
  }

  public localisation() {
    this.city = this.cityService.create();
    this.cityService.retrieveCurrentPosition()
      .then((city: City) => {
        this.weatherService.retrieveWeatherByCoord(this.city)
          .then((city: City) => {
            this.city = city;
          })
      })
      .catch((error: string) => {
        alert("Pas d'accès à la localisation. Veuillez ré-essayer.")
          ;
      });
  }

  public next(): void {
    
    if ((this.city.tabIndex + 1) == (40)) {
      this.city.tabIndex = 0
    } else {
      this.city.tabIndex = this.city.tabIndex + 1;
    }
    return;
  }

  public prev(): void {
    if ((this.city.tabIndex - 1) == -1) {
      this.city.tabIndex = 39
    } else {
      this.city.tabIndex = this.city.tabIndex - 1;
    }
    return;
  }
}
