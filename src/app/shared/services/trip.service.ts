import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trip } from '../entities/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  readonly baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl + `trip`);
  }

  saveTrip(trip: Trip): Observable<any> {
    return this.http.post(this.baseUrl + `trip`, trip);
  }  

}
