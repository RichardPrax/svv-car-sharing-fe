import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://svv-car-sharing-api.vercel.app/api/cars';

  constructor(private http: HttpClient) { }

  registerForCar(carId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${carId}/register`, {});
  }
  deregisterFromCar(carId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${carId}/deregister`, {});
  }

  getCarsForGameDay(gameDayId: string){
    return this.http.get<any>(`${this.apiUrl}/gameday/${gameDayId}`);
  }

  getCarByID(carId: string){
    return this.http.get<any>(`${this.apiUrl}/${carId}`);
  }

  offerCar(ownerId: string |null,username: string | null , departureTime: string, departureFrom: string, numberOfSeats: number, gameDayId: string, info:string): Observable<any> {
    const carData = {
      owner: ownerId,
      numberOfSeats: numberOfSeats,
      driver: username,
      departureTime: departureTime,
      departureFrom: departureFrom,
      gameDay: gameDayId,
      info: info
    };
    return this.http.post(`${this.apiUrl}`, carData);
  }

  updateCar(carId: string, ownerId: string |null,username: string | null , departureTime: string, departureFrom: string, numberOfSeats: number, gameDayId: string, info: string): Observable<any> {
    const carData = {
      owner: ownerId,
      numberOfSeats: numberOfSeats,
      driver: username,
      departureTime: departureTime,
      departureFrom: departureFrom,
      gameDay: gameDayId,
      info: info
    };
    return this.http.put(`${this.apiUrl}/${carId}`, carData);
  }

  deleteCar(carId: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${carId}`);
  }
}
