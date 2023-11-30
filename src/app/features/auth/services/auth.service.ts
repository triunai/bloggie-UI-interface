import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,{
      email: request.email,
      password: request.password,
    })
  }

  // to store at the local storage
  // will receive user object, or user roles
  setUser(user: User): void{

    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join());
  }

}
