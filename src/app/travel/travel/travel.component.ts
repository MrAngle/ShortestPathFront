import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { ICountry } from 'country-state-city';
import { map, Observable, startWith } from 'rxjs';
import { CountryResults } from 'src/app/shared/entities/country-results';
import { Trip } from 'src/app/shared/entities/trip';
import { CountryDataService } from 'src/app/shared/services/country-data.service';
import { CountryRoutingService } from 'src/app/shared/services/country-routing.service';
import { TripService } from 'src/app/shared/services/trip.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

  readonly ORIGIN_NAME = "Origin";
  readonly DESTINATION_NAME = "Destination";
  readonly MIN_COUNTRY_NAME_LENGTH = 3;
  readonly MAX_COUNTRY_NAME_LENGTH = 40;
  
  @ViewChildren('myChips') myChips!: QueryList<MatChip>;

  results: CountryResults = { data: [], errorMessage: '' };
  countries: ICountry[] | undefined;
  selectOptions: string[] = [];
  trip: Trip | undefined;
  fromFilteredOptions!: Observable<string[]>;
  destinationFilteredOptions!: Observable<string[]>;
  selectedCountryDetails: string | undefined;

  form: FormGroup = this.formBuilder.group(
    {
      [this.ORIGIN_NAME]: [
        'Poland',
        [Validators.required, Validators.minLength(this.MIN_COUNTRY_NAME_LENGTH), Validators.maxLength(this.MAX_COUNTRY_NAME_LENGTH)]],
      [this.DESTINATION_NAME]: [
        'Albania',
        [Validators.required, Validators.minLength(this.MIN_COUNTRY_NAME_LENGTH), Validators.maxLength(this.MAX_COUNTRY_NAME_LENGTH)]],
    }
  );

  constructor(private formBuilder: FormBuilder, private countryRoutingService: CountryRoutingService, private countryDataService: CountryDataService,
    private tripService: TripService) {
    this.prepareSelectOptions();
  }
  
  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  get destinationControl(): AbstractControl {
    return this.form.controls[this.DESTINATION_NAME];
  }
  get originControl(): AbstractControl {
    return this.form.controls[this.ORIGIN_NAME];
  }
  
  ngOnInit(): void {
  }

  prepareSelectOptions(): void {
    this.countries = this.countryDataService.getAllCountries();
    this.selectOptions = this.countries.map(country => country.name);
    this.destinationFilteredOptions = this.formControls[this.DESTINATION_NAME].valueChanges.pipe(
      startWith(''),
      map(value => this.filterValues(value || ''))
    );
    this.fromFilteredOptions = this.formControls[this.ORIGIN_NAME].valueChanges.pipe(
      startWith(''),
      map(value => this.filterValues(value || ''))
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.resetResults();

    const fromCountry: string = this.form.value[this.ORIGIN_NAME];
    const destinationCountry: string = this.form.value[this.DESTINATION_NAME];

    const fromCountryIsoCode: string | undefined = this.getCountryIsoCode(fromCountry);
    const destinationCountryIsoCode: string | undefined = this.getCountryIsoCode(destinationCountry);

    if (!fromCountryIsoCode || !destinationCountryIsoCode) {
      return;
    }
    this.processSubmit(fromCountryIsoCode, destinationCountryIsoCode);
  }

  onReset(): void {
    this.resetResults();
    this.form.reset();
  }

  saveTrip(): void {
    if(this.trip) {
      this.tripService.saveTrip(this.trip).subscribe();
    }
  }
  
  destinationErrorMessage(): string {
    return this.errorMessage(this.destinationControl)
  }

  originErrorMessage(): string {
    return this.errorMessage(this.originControl)
  }
  
  private getCountryIsoCode(countryCode: string): string | undefined {
    const countryIsoCode: string | undefined = this.countryDataService.getCountryIsoCode(countryCode);
    if (!countryIsoCode) {
      this.results.errorMessage = "Wrong iso code: " + countryCode;
      return;
    }
    return countryIsoCode;
  }

  private processSubmit(fromCountryIsoCode: string, destinationCountryIsoCode: string): void {
    const pathResponse: Observable<any> = this.countryRoutingService.getShortestsPath(fromCountryIsoCode, destinationCountryIsoCode);
    pathResponse.subscribe(
      (data: any[]) => {
        this.results.data = data;
        this.trip = this.getTrip(this.results.data);
      },
      (error: any) => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.results.errorMessage = 'Connection error';
          } else if (error.status === 400) {
            this.results.errorMessage = error.error.message;
          }
        } else {
          this.results.errorMessage = `Error: ${error.message}`;
        }
      }
    );
  }

  private resetResults(): void {
    this.results.data = [];
    this.results.errorMessage = '';
    this.selectedCountryDetails = undefined;
    this.trip = undefined;
  }
  
  private getTrip(countryList: string[]): Trip {
    const randomNumber = Math.floor(Math.random() * 10_000) + 1;
    return {
      countries: countryList.join(','),
      name: this.results.data[0] + "_" + this.results.data[this.results.data.length-1] + randomNumber
    }
  }

  private filterValues(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.selectOptions.filter(street => this.normalizeValue(street).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  private errorMessage(form: AbstractControl): string {
    if (form.hasError('required')) {
      return 'This field is required and cannot be empty.'
    }
    if (form.hasError('minlength')) {
      return 'This field requires a longer value. Minimum length is ' + this.MIN_COUNTRY_NAME_LENGTH;
    }
    if (this.originControl.hasError('maxlength')) {
      return 'This field requires a shorter value. Maximum length is ' + this.MAX_COUNTRY_NAME_LENGTH;
    }
    return "Unknown error";
  }
}
