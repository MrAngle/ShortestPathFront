import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from '../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CountryDetailsComponent } from './country-details/country-details.component';



@NgModule({
  declarations: [TripComponent, CountryDetailsComponent],
  exports: [TripComponent, CountryDetailsComponent],
  imports: [
    CommonModule, MaterialExampleModule, ReactiveFormsModule, FormsModule
  ]
})
export class TripModule { }
