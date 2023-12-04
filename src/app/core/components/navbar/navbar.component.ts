import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user? : User;

  constructor(
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        // if(response)
        // console.log(`This is the navbar response: ${JSON.stringify(response)}`);
        this.user = response;
      },
      error: (err) =>{
        console.error("navbar cant read users ", err);

      }
    });

    this.user = this.authService.getUser();
  }

  onLogout(): void{
    this.authService.logout();
    this.router.navigateByUrl('/'); // <--- Routes back to the homepage
  }




}
