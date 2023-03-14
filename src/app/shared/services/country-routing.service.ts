import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Country } from '../entities/country';
import { CountryIdentifier } from '../entities/country-identifier';

@Injectable({
  providedIn: 'root'
})
export class CountryRoutingService {

  readonly baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  getShortestsPath(from: String, to: String): Observable<String[]> {
    let params = new HttpParams()
      .set('from', from.toString())
      .set('to', to.toString())

    return this.http.get<String[]>(this.baseUrl + `country/routing`, {params: params});
  }  
  
  getCountryDetails(countryCode: string, countryIdentifier: CountryIdentifier): Observable<Country> {
    // TODO: should use DTOs
    let params = new HttpParams()
      .set('countryIdentifierType', CountryIdentifier[countryIdentifier]);
    return this.http.get<Country>(this.baseUrl + `country/${countryCode}`, {params: params});
  }

}
