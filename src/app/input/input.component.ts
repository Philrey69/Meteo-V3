import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../shared/models/city.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../shared/services/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CityService } from '../shared/services/city.service';
import { WeatherComponent } from '../weather/weather.component';
import { RouterModule, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { FavoriteService } from '../shared/services/favorite.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Output() cityValue = new EventEmitter();
  private city: City;
  private inputForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private router: Router,
    private alertController: AlertController
  ) {

    this.inputForm = this.formBuilder.group({
      cityKeyed: ['', Validators.required]
    });

  }

  private goButton() {

    if (this.inputForm.value.cityKeyed == "") {
      alert("Please enter the city you want.")
    } else {
      this.weatherService.retrieveWeatherByName(this.inputForm.value.cityKeyed)
        .then((city: City) => {
          localStorage.setItem("city", this.inputForm.value.cityKeyed);
          this.inputForm.get("cityKeyed").setValue("");
          this.cityValue.emit(city);
        })
        .catch((error: HttpErrorResponse) => {
          alert("Httprequest ERROR. Try again")
            ;
        });
    }
  }

  onKeyPress(e: any) {
    if (e.keyCode === 13 && e.target.value) {
      this.goButton();
    }
  }

  ngOnInit() { }

}
