import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { TravelComponent } from './travel/travel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryRoutingService } from '../shared/services/country-routing.service';
import { CountryDataService } from '../shared/services/country-data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { CountryDescriptionComponent } from './country-description/country-description.component';
import { Module2RoutingModule } from './travel-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TripService } from '../shared/services/trip.service';
import { TripModule } from '../trip/trip.module';
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TravelComponent,
    CountryDescriptionComponent
  ],
  exports: [TravelComponent,
    CountryDescriptionComponent],
  providers: [
    CountryRoutingService, CountryDataService, TripService
  ],
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, MaterialExampleModule, TripModule
  ]
})
export class TravelModule { }
