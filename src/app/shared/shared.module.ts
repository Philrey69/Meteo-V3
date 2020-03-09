import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,    
    IonicModule.forRoot()
  ],
  exports: [
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
