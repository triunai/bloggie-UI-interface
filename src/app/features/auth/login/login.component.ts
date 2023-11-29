import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: LoginRequest;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router ) {

    this.model = {
      email: '',
      password: ''
    }

  }

  onFormSubmit(){
    this.authService.login(this.model).subscribe({
      next: (response) =>{
        console.log(response);
        // use the ngx package cookie
        // set auth cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');
        this.router.navigateByUrl('/');
      },
      error: (err) =>{
        console.error('unable to login: '+err.message);
      }
    });
  }
}
