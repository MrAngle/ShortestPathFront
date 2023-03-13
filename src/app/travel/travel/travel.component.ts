import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountry } from 'country-state-city';
import { map, Observable, startWith } from 'rxjs';
import { CountryDataService } from 'src/app/shared/services/country-data.service';
import { CountryRoutingService } from 'src/app/shared/services/country-routing.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

  // TODO: remove https://stackblitz.com/edit/angular-13-reactive-form-validation?file=package.json

  results: string = "";
  countries: ICountry[] | undefined;
  options: string[] = [];

  // control = new FormControl('');
  fromFilteredOptions!: Observable<string[]>;
  destinationFilteredOptions!: Observable<string[]>;


  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private countryRoutingService: CountryRoutingService, private countryDataService: CountryDataService) {
    this.form = this.formBuilder.group(
      {
        from: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      }
    );
    
    console.log('constructor');
    this.countries = this.countryDataService.getAllCountries();
    console.log(this.countries);

    // this.streets = this.countries.map(country => country.name);
    // console.log(this.streets);
    this.options = this.countries.map(country => country.name);

    this.destinationFilteredOptions = this.f['destination'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.fromFilteredOptions = this.f['from'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );    
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log("cokolwiek")
    console.log(JSON.stringify(this.form.value, null, 2));
    const fromCountry: string = this.form.value['from'];
    const destinationCountry: string = this.form.value['destination'];

    console.log(fromCountry);
    console.log(destinationCountry);

    const fromCountryIsoCode: string | undefined  = this.countryDataService.getCountryIsoCode(fromCountry);
    const destinationCountryIsoCode: string | undefined = this.countryDataService.getCountryIsoCode(destinationCountry);

    console.log(fromCountryIsoCode);
    console.log(destinationCountryIsoCode);


    if(!fromCountryIsoCode || !destinationCountryIsoCode) {
      // TODO: add global error
      console.error("something wrong");
      return;
    }


    const ss: Observable<any> = this.countryRoutingService.getShortestsPath(fromCountryIsoCode, destinationCountryIsoCode);
    ss.subscribe(data => console.log(this.results = data));
    console.log(ss);
    console.log(JSON.stringify(ss));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }



  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.options.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
    console.log(this.options);
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
