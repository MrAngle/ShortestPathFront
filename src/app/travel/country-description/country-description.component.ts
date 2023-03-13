import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Country } from '../../shared/entities/country';
import { CountryIdentifier } from '../../shared/entities/country-identifier';
import { CountryRoutingService } from 'src/app/shared/services/country-routing.service';

@Component({
  selector: 'app-country-description',
  templateUrl: './country-description.component.html',
  styleUrls: ['./country-description.component.scss']
})
export class CountryDescriptionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() countryCode: string | undefined;

  country: Country= {
    name: '',
    region: '',
    isoCode: '',
    countryCode: '',
    coordinates: []
  };

  constructor(private countryRoutingService: CountryRoutingService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('countryCode' in changes) {
      this.loadCountryDetails();
    }
  }

  ngOnDestroy() {
    console.log('CountryDescriptionComponent ngOnDestroy');
  }


  loadCountryDetails(): void {
    if(this.countryCode) {
      this.countryRoutingService.getCountryDetails(this.countryCode, CountryIdentifier.CCA_3).subscribe(
        (data: Country) => {
          this.country = data;
        }
      );
    }
  }
}
