import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelComponent } from './travel/travel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryRoutingService } from '../shared/services/country-routing.service';
import { CountryDataService } from '../shared/services/country-data.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { CountryDescriptionComponent } from './country-description/country-description.component';



@NgModule({
  declarations: [
    TravelComponent,
    CountryDescriptionComponent
  ],
  providers: [
    CountryRoutingService, CountryDataService
  ],
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, MaterialExampleModule, NoopAnimationsModule
  ]
})
export class TravelModule { }
