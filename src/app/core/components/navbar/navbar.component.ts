import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user? : User;

  constructor(private authService: AuthService) {

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
  }

  onLogout(){

  }




}
