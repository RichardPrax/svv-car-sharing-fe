import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarOfferFormComponent } from './update-car-offer-form.component';

describe('UpdateCarOfferFormComponent', () => {
  let component: UpdateCarOfferFormComponent;
  let fixture: ComponentFixture<UpdateCarOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCarOfferFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCarOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
