import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,{
      email: request.email,
      password: request.password,
    })
  }

  // to store at the local storage
  // will receive user object, or user roles

  setUser(user: User): void{



    this.$user.next(user); // updates the user behaviour subject with new user details

    // takes a key value pair
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));

  }

  // if any part of our app calls this user method from the service, it gets the latest values of the user
  user(): Observable< User | undefined >{
    return this.$user.asObservable();
  }

  logout(): void{
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');

    // here we pass an undefined value, just to ensure that the latest user data is undefined on logout, which matches out html template
    this.$user.next(undefined);
  }

  // to get users from the local storage, for any components listening to $user()
  getUser(): User | undefined{
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles){
      const user: User = {
        email: email,
        roles: roles?.split(',')
      }
      return user;
    }
    return undefined;
  }

}
