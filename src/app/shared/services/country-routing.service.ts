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
    return this.http.get<String[]>(this.baseUrl + `country/routing/${from}/${to}`);
  }  
  
  getCountryDetails(countryCode: string, countryIdentifier: CountryIdentifier): Observable<Country> {
    let params = new HttpParams()
      .set('countryIdentifierType', CountryIdentifier[countryIdentifier]);
    return this.http.get<Country>(this.baseUrl + `country/${countryCode}`, {params: params});
  }

}
