import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private citiesList: string[] = [];
  constructor() { }

  find(town: string) {
    this.load();
    let index = this.citiesList.indexOf(town);
    return index;
  }

  load() {
    let nomVar: string;

    let index = localStorage.getItem("index")
    if (index) {
      for (let i = 0; i <= parseInt(index); i++) {
        nomVar = "ville" + i.toString();
        this.citiesList[i] = localStorage.getItem(nomVar);
        this.citiesList[i+1] = "";
      };
    }
  }

  delete(town: string) {
    let nomVar: string;
    let ind = this.find(town);
    let index = this.citiesList.length;
    for (let i = 0; i <= index - 1; i++) {
      nomVar = "ville" + i.toString();
      localStorage.removeItem(nomVar);
    };
    this.citiesList.splice(ind, 1);
    index = index - 1;
    for (let i = 0; i <= index - 1; i++) {
      nomVar = "ville" + i.toString();
      localStorage.setItem(nomVar,this.citiesList[i]);
    };
    nomVar = localStorage.getItem("index");
    index = parseInt(nomVar) - 1;
    localStorage.setItem("index", index.toString() );
  }

  add(city: City) {
    let nomVar: string;
    let index = this.load();
    if (-1 === this.citiesList.indexOf(city.name) && city.name) {
      this.citiesList.unshift(city.name);
      let newIndex = this.citiesList.length - 1;

      for (let i = 0; i <= newIndex; i++) {
        nomVar = "ville" + i.toString();
        localStorage.setItem(nomVar, this.citiesList[i]);
      };
      localStorage.setItem("index", newIndex.toString());
    }
  }

}

