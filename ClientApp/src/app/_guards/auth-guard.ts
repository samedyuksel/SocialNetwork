import { AuthService } from './../_services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate() {

    // console.log("auth guard");
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/home'])
    return false;
  }
}
