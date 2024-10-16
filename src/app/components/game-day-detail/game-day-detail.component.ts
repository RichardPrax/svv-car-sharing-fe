import { Component, OnInit } from '@angular/core';
import { GameDayService } from '../../services/game-day.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CarCardComponent } from '../car-card/car-card.component';
import { CarOfferFormComponent } from '../car-offer-form/car-offer-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-day-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, CarCardComponent, CarOfferFormComponent],
  templateUrl: './game-day-detail.component.html',
  styleUrl: './game-day-detail.component.css'
})
export class GameDayDetailComponent implements OnInit {
  gameDay: any;
  gameDayId: string = '';

  constructor(
    private route: ActivatedRoute,
    private gameDayService: GameDayService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameDayId = id!;
    
    this.gameDayService.getGameDayById(id!).subscribe((data: any) => {
      this.gameDay = data.gameDay;
    });
  }

  openCarOfferModal() {
    const modalRef = this.modalService.open(CarOfferFormComponent);
    modalRef.componentInstance.gameDayId = this.gameDayId;
    modalRef.result.then((result) => {
      this.ngOnInit();
    }, (reason) => {
    });
  }
}