import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferFormComponent } from './car-offer-form.component';

describe('CarOfferFormComponent', () => {
  let component: CarOfferFormComponent;
  let fixture: ComponentFixture<CarOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOfferFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
