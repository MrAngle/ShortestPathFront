import { Injectable } from '@angular/core';
import { Country, State, City, ICountry } from 'country-state-city';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  countries: ICountry[] = Country.getAllCountries();

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
}
