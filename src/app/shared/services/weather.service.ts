import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CityService } from './city.service';
import { FavoriteService } from './favorite.service';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private city: City

  constructor(
    private http: HttpClient,
    private cityService: CityService,
    private favoriteService: FavoriteService
  ) { }

  public retrieveWeatherByCoord(city: City): Promise<City> {
    console.log("retrieve weather by coord : entrée")
    console.log(city)
    this.city = city
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + "weather?lat=" + this.city.latitude + "&lon="
        + this.city.longitude + "&appid=" + environment.appId + "&units=" + environment.units)
        .toPromise()
        .then((response: JSON) => {
          this.city = this.hydratDayWeatherFromJSON(response);
          localStorage.setItem("city", this.city.name);
          this.retrieveForecastsByName(this.city.name);
          resolve(this.city)
        })
        .catch((error: HttpErrorResponse) => {
          alert(`rerieveByCoord KO - error : ${error}`)
          reject(error)
        });
    })
  }

  public retrieveWeatherByName(cityName: string): Promise<City> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + "weather?q=" + cityName
        + "&appid=" + environment.appId + "&units=" + environment.units)
        .toPromise()
        .then((response: JSON) => {
          this.hydratDayWeatherFromJSON(response);
          localStorage.setItem("city", this.city.name);
          this.retrieveForecastsByName(this.city.name);
          resolve(this.city)
        })
        .catch((error: HttpErrorResponse) => {
          alert(`rerieveByName KO - error : ${error}`)
          reject(error)
        });
    })
  }


  public retrieveForecastsByName(cityName: string): Promise<City> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + "forecast?q=" + cityName
        + "&appid=" + environment.appId + "&units=" + environment.units)
        .toPromise()
        .then((response: JSON) => {
          this.hydratForecastFromJSON(response);
          console.log("Forecasts OK - this city :")
          console.log(this.city)
          if (this.favoriteService.find(this.city.name) != -1) {
            console.log("Ville favorite !")
            this.city.favorite = true;
          } else {
            this.city.favorite = false;
          }
          localStorage.setItem("city", this.city.name);
          resolve(this.city)
        })
        .catch((error: HttpErrorResponse) => {
          alert(`rerieveForecasts KO - error : ${[error.message]}`)
          reject(error)
        });
    })
  }


  public hydratDayWeatherFromJSON(response: JSON) {
    this.city = this.cityService.create();
    this.city.name = response['name'].toUpperCase();
    this.city.description = response['weather'][0]['description'].toUpperCase();
    let dt = new Date((response['sys']['sunrise'])*1000);
    this.city.sunRise = dt.getHours();
    this.city.sunRise = (this.city.sunRise * 100) + dt.getMinutes();
    dt = new Date((response['sys']['sunset'])*1000);
    this.city.sunSet = dt.getHours();
    this.city.sunSet = (this.city.sunSet * 100) + dt.getMinutes();
    var date = new Date();
    var actual = date.getHours();
    actual = (actual * 100) + dt.getMinutes();
    if (actual > this.city.sunRise && actual < this.city.sunSet) {
      this.city.descriptionIcon = "s" + response['weather'][0]['description'].replace(' ', '_');
    } else {
      this.city.descriptionIcon = "m" + response['weather'][0]['description'].replace(' ', '_');
    }
    this.city.tempActual = response['main']['temp'].toFixed(1);
    this.city.tempMax = response['main']['temp_max'].toFixed(1);
    this.city.tempMin = response['main']['temp_min'].toFixed(1);
    this.city.wind = response['wind']['speed'].toFixed(1);
    this.city.humidity = response['main']['humidity'].toFixed(1);
    this.city.tempFeel = response['main']['feels_like'].toFixed(1);
    this.city.latitude = response['coord']['lat'];
    this.city.longitude = response['coord']['lon'];
    return this.city;
  }

  public hydratForecastFromJSON(response: JSON) {
    for (let i = 0; i <= 39; i++) {
      this.city.tabIconName[i] = (response['list'][i]['weather'][0]['description']).replace(' ', '_');
      this.city.tabWeatherDescription[i] = response['list'][i]['weather'][0]['description'].toUpperCase();
      let dt = new Date(Date.parse(response['list'][i]['dt_txt']));
      this.city.tabMois[i] = dt.getMonth() + 1;
      this.city.tabJour[i] = dt.getDate();
      this.city.tabHeure[i] = dt.getHours();
      let tempMoy = response['list'][i]['main']['temp'].toFixed(1);
      this.city.tabTemp[i] = tempMoy;
      this.city.tabWind[i] = response['list'][i]['wind']['speed'].toFixed(1);
      if (this.city.tabHeure[i] * 100 > this.city.sunRise && this.city.tabHeure[i] * 100 < this.city.sunSet) {
        this.city.tabIconName[i] = "s" + response['list'][i]['weather'][0]['description'].replace(' ', '_');
      } else {
        this.city.tabIconName[i] = "m" + response['list'][i]['weather'][0]['description'].replace(' ', '_');
      }

    }
    return this.city;
  }

}
