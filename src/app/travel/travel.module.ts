import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/material.module';
import { CountryDataService } from '../shared/services/country-data.service';
import { CountryRoutingService } from '../shared/services/country-routing.service';
import { TripService } from '../shared/services/trip.service';
import { TripModule } from '../trip/trip.module';
import { TravelComponent } from './travel/travel.component';


@NgModule({
  declarations: [
    TravelComponent
  ],
  exports: [TravelComponent],
  providers: [
    CountryRoutingService, CountryDataService, TripService
  ],
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, MaterialExampleModule, TripModule
  ]
})
export class TravelModule { }
