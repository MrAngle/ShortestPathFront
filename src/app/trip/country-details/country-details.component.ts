import { Component, Input, SimpleChanges } from '@angular/core';
import { Country } from 'src/app/shared/entities/country';
import { CountryIdentifier } from 'src/app/shared/entities/country-identifier';
import { CountryRoutingService } from 'src/app/shared/services/country-routing.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent {
  @Input() countryCode: string | undefined;

  country: Country | undefined;

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
