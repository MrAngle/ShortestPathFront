import { Component, Input, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Trip } from '../shared/entities/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() trips: Trip[] = [];
  selectedCountryDetails: string | undefined;

  constructor() {
  }

  ngOnInit() {}
  

  onChipClicked(chip: MatChip) {
    this.selectedCountryDetails = chip.value.replace(/[^A-Za-z]/g, '')
    console.log("this.selectedCountryDetails ")
    console.log(this.selectedCountryDetails)
  }
  
}
