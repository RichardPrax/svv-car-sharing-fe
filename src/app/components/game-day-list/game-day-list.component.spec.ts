import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDayListComponent } from './game-day-list.component';

describe('GameDayListComponent', () => {
  let component: GameDayListComponent;
  let fixture: ComponentFixture<GameDayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDayListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
