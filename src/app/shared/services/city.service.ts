import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private city: City

  constructor(
  ) { 

  }


  public create() {
    this.city = {
      name: "",
      latitude: "",
      longitude: "",
      daytime: "",
      tempMin: "",
      tempActual: "",
      tempMax: "",
      tempFeel: "",
      description: "",
      descriptionIcon: "",
      sunRise: 0,
      sunSet: 0,
      wind: "",
      humidity: "",
      favorite: false,
      tabWeatherDescription: [],
      tabIconName: [],
      tabHeure: [],
      tabJour: [],
      tabMois: [],
      tabTemp: [],
      tabWind: [],
      tabIndex: 0
    }
    return (this.city);
  };

  public retrieveCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.city.latitude = position['coords']['latitude'].toFixed(5);
          this.city.longitude = position['coords']['longitude'].toFixed(5);
          resolve(this.city)
        },
        (error) => {
          alert(`Pb d'accès à votre position actuelle : ${error}`);
          reject(error);
        })
    });
  }

}