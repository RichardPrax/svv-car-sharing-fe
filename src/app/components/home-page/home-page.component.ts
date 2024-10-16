import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { GameDayListComponent } from '../game-day-list/game-day-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, GameDayListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
