import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {RoutePath} from "../../shared/models/route-path";
import {OnboardService} from "../../onboard/services/onboard.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private onboardService: OnboardService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentAdmin = this.onboardService.currentUserValue;
    const token = localStorage.getItem('access_token');

    if (token) {
      const decodedToken = new JwtHelperService().decodeToken(token);
      const expiryDate = new Date(decodedToken.exp * 1000);
      const today = new Date();
      if(today < expiryDate) {
        return true;
      }
      
    }

    // not logged in so redirect to login page with the return url
    this.onboardService.logout();
    return false;
  }

}
