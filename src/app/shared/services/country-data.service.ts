import { Injectable } from '@angular/core';
import { Country, State, City, ICountry } from 'country-state-city';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  countries: ICountry[] = Country.getAllCountries();

  constructor() {
    // require('countrycitystatejson');
  }

  // private countryData = countrycitystatejson;

  getAllCountries(): ICountry[] {
    // TODO: map to another type
    return this.countries;
  }

  getCountryIsoCode(countryFullName: string): string | undefined {
    // TODO: map to another type
    const country: ICountry | undefined = this.countries.find(country => country.name === countryFullName);
    if(!country) {
      return undefined;
    }
    return country.isoCode;
  }

  // getStatesByCountry(countryShotName: string) {
  //   return this.countryData.getStatesByShort(countryShotName);
  // }

  // getCitiesByState(country: string, state: string) {
  //   return this.countryData.getCities(country, state);
  // }
}
