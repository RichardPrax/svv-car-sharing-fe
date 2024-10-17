import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCarOfferFormComponent } from '../update-car-offer-form/update-car-offer-form.component';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, UpdateCarOfferFormComponent],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})
export class CarCardComponent implements OnInit {
  @Input() car: any;
  isRegistered:boolean = false;
  isDriver: boolean = false;

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const currentUserId = this.authService.getUserID();
    this.isRegistered = this.car.registeredUsers.some((user: any) => {
      return user._id === currentUserId
    });

    const userName = this.authService.getUsername();
    this.isDriver = this.car.driver === userName;
  }

  toggleRegistration() {
    if (this.isRegistered) {
      this.deregister();
    } else {
      this.register();
    }
  }

  register() {
    this.carService.registerForCar(this.car._id).subscribe(() => {
      this.carService.getCarByID(this.car._id).subscribe((car : any) => {
        this.car = car;
        this.ngOnInit();
      });
    });
  }

  deregister() {
    this.carService.deregisterFromCar(this.car._id).subscribe(() => {
      this.carService.getCarByID(this.car._id).subscribe((car : any) => {
        this.car = car;
        this.ngOnInit();
      });
    });
  }

  openUpdateCar(car: any) {
    const modalRef = this.modalService.open(UpdateCarOfferFormComponent, { size: 'lg' });
    modalRef.componentInstance.car = car;
    modalRef.result.then(() => {
      this.router.navigate(['/game-day', car.gameDay._id]);
    });
  }

  deleteCar(car: any) {
    this.carService.deleteCar(car._id).subscribe(
      () => {
        this.router.navigate(['/game-day', car.gameDay._id]);
      },
      (error) => {
        console.error('Error deleting car:', error);
      }
    );
  }
  

}
