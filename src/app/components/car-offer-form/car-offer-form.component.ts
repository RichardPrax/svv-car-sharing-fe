import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importiere NgbActiveModal

@Component({
  selector: 'app-car-offer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-offer-form.component.html',
  styleUrls: ['./car-offer-form.component.css']
})
export class CarOfferFormComponent {
  @Input() gameDayId: string = '';

  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private authService: AuthService,
    public activeModal: NgbActiveModal
  ) {
    this.carForm = this.fb.group({
      departureTime: ['', Validators.required],
      departureFrom: ['', Validators.required],
      numberOfSeats: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      const userId = this.authService.getUserID();
      const username = this.authService.getUsername();
      const { departureTime, departureFrom, numberOfSeats } = this.carForm.value;
      
      this.carService.offerCar(userId, username, departureTime, departureFrom, numberOfSeats, this.gameDayId).subscribe({
        next: () => {
          this.activeModal.close('saved');
        },
        error: (err) => {
          console.error('Fehler beim Anbieten der Fahrgemeinschaft:', err);
        }
      });
    }
  }

  closeForm(){
    this.activeModal.close();
  }
}
