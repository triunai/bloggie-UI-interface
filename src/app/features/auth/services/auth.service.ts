import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  $user = new BehaviorSubject<User | undefined>(undefined);

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

    this.$user.next(user); // we are sending the logged users from the params to any listener of this subscriber/observable

    // takes a key value pair
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));

  }

  user(): Observable< User | undefined >{

    return this.$user.asObservable();
  }

}
