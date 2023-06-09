import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CountryRoutingService } from './country-routing.service';

describe('CountryRoutingService', () => {
  let service: CountryRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryRoutingService]
    });
    service = TestBed.inject(CountryRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
