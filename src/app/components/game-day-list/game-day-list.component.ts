import { Component, OnInit } from '@angular/core';
import { GameDayService } from '../../services/game-day.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-day-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-day-list.component.html',
  styleUrl: './game-day-list.component.css'
})
export class GameDayListComponent implements OnInit {
  gameDays: any[] = [];

  constructor(private gameDayService: GameDayService, private router: Router) { }

  ngOnInit(): void {
    this.gameDayService.getAllGameDays().subscribe((data: any) => {
      this.gameDays = data.gameDays;
    });
  }

  viewDetails(id: string) {
    console.log("test");
    this.router.navigate(['/game-day', id]);
  }
}
