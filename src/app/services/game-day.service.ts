import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameDayService {
  private apiUrl = 'https://svv-car-sharing-api.vercel.app/api/gameDays';

  constructor(private http: HttpClient) { }

  getAllGameDays(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getGameDayById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
