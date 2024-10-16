import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDayDetailComponent } from './game-day-detail.component';

describe('GameDayDetailComponent', () => {
  let component: GameDayDetailComponent;
  let fixture: ComponentFixture<GameDayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDayDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
