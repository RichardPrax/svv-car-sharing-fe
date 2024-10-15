import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../../models/AuthenticationRequest';
import { AuthenticationResponse } from '../../models/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://svv-car-sharing-api.vercel.app/api/auth';

  constructor(private http: HttpClient,
              private router: Router
  ) { }

  authenticate(authenticationRequest: AuthenticationRequest){
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, authenticationRequest).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', userData.username);
          sessionStorage.setItem('accessToken', userData.accessToken);
          return userData;          
        }
      )
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('username') ? true : false;
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
