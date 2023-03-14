import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from '../../material.module';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { TripComponent } from './trip.component';



@NgModule({
  declarations: [TripComponent, CountryDetailsComponent],
  exports: [TripComponent, CountryDetailsComponent],
  imports: [
    CommonModule, MaterialExampleModule, ReactiveFormsModule, FormsModule
  ]
})
export class TripModule { }
