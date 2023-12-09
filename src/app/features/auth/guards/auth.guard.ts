import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {

  // initialize cookie service
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();  // to get users from local storage

  // check for jwt token/cookie
  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');

    // decode token to check
    const decodedToken:any = jwtDecode(token); // <--- added any here for expiry

    // check token expiry
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime(); // gets the current time in ms

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree
      (
      ['/login'],
      {queryParams: { returnUrl: state.url}}
      );
  }
    else{
      // token is still valid
      // check for roles in local storage
      if (user.roles.includes('Writer')){
        return true;
      }
      else{
        authService.logout(); // clears local storage data and delete the cookie
        alert('You just got logged out, dont try again');
        return false;
      }
    }
  }
  else
  {
  // logout
  authService.logout(); // clears local storage data and delete the cookie
  return router.createUrlTree
    (
    ['/login'],
    {queryParams: { returnUrl: state.url}}
    );
  }
}
