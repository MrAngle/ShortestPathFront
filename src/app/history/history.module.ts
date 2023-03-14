import { NgModule } from '@angular/core';
import { TripModule } from '../trip/trip.module';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { TripService } from '../shared/services/trip.service';

@NgModule({
  declarations: [TripHistoryComponent],
  providers: [TripService],
  imports: [
    TripModule
  ]
})
export class HistoryModule { }
