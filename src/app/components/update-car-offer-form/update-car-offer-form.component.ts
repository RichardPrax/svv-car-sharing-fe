import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-car-offer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-car-offer-form.component.html',
  styleUrl: './update-car-offer-form.component.css'
})
export class UpdateCarOfferFormComponent {
  @Input() car: any;

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
      numberOfSeats: [1, [Validators.required, Validators.min(1)]],
      info: ['']
    });
  }

  ngOnInit(): void {
    if (this.car) {
      this.carForm.patchValue({
        departureTime:this.car.departureTime,
        departureFrom:this.car.departureFrom,
        numberOfSeats:this.car.numberOfSeats,
        info: this.car.info
      });
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      const userId = this.authService.getUserID();
      const username = this.authService.getUsername();
      const { departureTime, departureFrom, numberOfSeats, info } = this.carForm.value;
      
      this.carService.updateCar(this.car._id, userId, username, departureTime, departureFrom, numberOfSeats, this.car.gameDay._id, info).subscribe({
        next: () => {
          this.activeModal.close('saved');
        },
        error: (err) => {
          console.error('Fehler beim aktualisieren der Fahrgemeinschaft:', err);
        }
      });
    }
  }

  closeForm(){
    this.activeModal.close();
  }
}
