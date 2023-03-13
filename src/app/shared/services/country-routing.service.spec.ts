import { TestBed } from '@angular/core/testing';

import { CountryRoutingService } from './country-routing.service';

describe('CountryRoutingService', () => {
  let service: CountryRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
