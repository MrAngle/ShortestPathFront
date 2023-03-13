import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
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
export class TravelComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

  readonly ORIGIN_NAME = "Origin";
  readonly DESTINATION_NAME = "Destination";
  readonly MIN_COUNTRY_NAME_LENGTH = 3;
  readonly MAX_COUNTRY_NAME_LENGTH = 40;
  
  @ViewChildren('myChips') myChips!: QueryList<MatChip>;

  results: CountryResults = { data: [], errorMessage: '' };
  countries: ICountry[] | undefined;
  options: string[] = [];
  trip: Trip | undefined;
  fromFilteredOptions!: Observable<string[]>;
  destinationFilteredOptions!: Observable<string[]>;
  selectedCountryDetails: string | undefined;

  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private countryRoutingService: CountryRoutingService, private countryDataService: CountryDataService,
    private tripService: TripService) {
    this.form = this.formBuilder.group(
      {
        [this.ORIGIN_NAME]: [
          'Poland',
          [Validators.required, Validators.minLength(this.MIN_COUNTRY_NAME_LENGTH), Validators.maxLength(this.MAX_COUNTRY_NAME_LENGTH)]],
        [this.DESTINATION_NAME]: [
          'Albania',
          [Validators.required, Validators.minLength(this.MIN_COUNTRY_NAME_LENGTH), Validators.maxLength(this.MAX_COUNTRY_NAME_LENGTH)]],
      }
    );
    this.countries = this.countryDataService.getAllCountries();
    this.options = this.countries.map(country => country.name);

    this.destinationFilteredOptions = this.formControls[this.DESTINATION_NAME].valueChanges.pipe(
      startWith(''),
      map(value => this.filterValues(value || ''))
    );
    this.fromFilteredOptions = this.formControls[this.ORIGIN_NAME].valueChanges.pipe(
      startWith(''),
      map(value => this.filterValues(value || ''))
    );
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
    console.log('ngOnInit');
  }

  onSubmit(): void {
    this.resetResults();
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const fromCountry: string = this.form.value[this.ORIGIN_NAME];
    const destinationCountry: string = this.form.value[this.DESTINATION_NAME];

    const fromCountryIsoCode: string | undefined = this.countryDataService.getCountryIsoCode(fromCountry);
    const destinationCountryIsoCode: string | undefined = this.countryDataService.getCountryIsoCode(destinationCountry);

    if (!fromCountryIsoCode || !destinationCountryIsoCode) {
      this.results.errorMessage = "Country not found, check country names";
      return;
    }

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

  onReset(): void {
    this.submitted = false;
    this.resetResults();
    this.form.reset();
  }

  getTrip(countryList: string[]): Trip {
    const randomNumber = Math.floor(Math.random() * 10_000) + 1;
    return {
      countries: countryList.join(','),
      name: this.results.data[0] + "_" + this.results.data[this.results.data.length-1] + randomNumber
    }
  }

  saveTrip(): void {
    console.log("zapisuje...")
    // const randomNumber = Math.floor(Math.random() * 10_000) + 1;
    // const trip: Trip = {
    //   countries: this.results.data.join(','),
    //   name: this.results.data[0] + "_" + this.results.data[this.results.data.length-1] + randomNumber
    // }
    if(this.trip) {
      this.tripService.saveTrip(this.trip).subscribe();
    }
    // TODO: add validation
    
  }

  resetResults() {
    this.results.data = [];
    this.results.errorMessage = '';
    this.selectedCountryDetails = undefined;
    this.trip = undefined;
  }

  onChipClicked(chip: MatChip) {
    this.selectedCountryDetails = chip.value.replace(/[^A-Za-z]/g, '')
    console.log("this.selectedCountryDetails ")
    console.log(this.selectedCountryDetails)
  }

  private filterValues(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.options.filter(street => this.normalizeValue(street).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  destinationErrorMessage(): string {
    return this.errorMessage(this.destinationControl)
  }

  originErrorMessage(): string {
    return this.errorMessage(this.originControl)
  }

  errorMessage(form: AbstractControl): string {
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

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }
}
