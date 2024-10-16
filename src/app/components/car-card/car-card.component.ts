import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})
export class CarCardComponent implements OnInit {
  @Input() car: any;
  isRegistered:boolean = false;

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUserId = this.authService.getUserID();
    this.isRegistered = this.car.registeredUsers.some((user: any) => {
      return user._id === currentUserId
    });
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
}
