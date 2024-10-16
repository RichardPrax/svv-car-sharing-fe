import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})
export class CarCardComponent implements OnInit {
  @Input() car: any; 
  isRegistered = false;

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUserId = this.authService.getUserID();
    this.isRegistered = this.car.registeredUsers.some((userId: string) => userId === currentUserId);
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
      this.isRegistered = true;
    });
  }

  deregister() {
    this.carService.deregisterFromCar(this.car._id).subscribe(() => {
      this.isRegistered = false;
    });
  }
}
