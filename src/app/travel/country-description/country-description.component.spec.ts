import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDescriptionComponent } from './country-description.component';

describe('CountryDescriptionComponent', () => {
  let component: CountryDescriptionComponent;
  let fixture: ComponentFixture<CountryDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
