import { Component } from '@angular/core';
import { Trip } from 'src/app/shared/entities/trip';
import { TripService } from 'src/app/shared/services/trip.service';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.scss']
})
export class TripHistoryComponent {

  trips: Trip[] = [];

  constructor(private tripService: TripService) {
    this.loadTrips();
  }

  private loadTrips(): void {
    this.tripService.getAllTrips().subscribe(
      (data: Trip[]) => {
        this.trips = data;
      }
      // TODO: add validation
    );
  }

}
