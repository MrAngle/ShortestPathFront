import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryRoutingService {

  readonly baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  getShortestsPath(from: String, to: String) {
    return this.http.get(this.baseUrl + `country-routing/${from}/${to}`);
  }

}
