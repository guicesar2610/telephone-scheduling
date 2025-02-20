import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (route.routeConfig && route.routeConfig.path === 'login') {
      return true;
    }

    const token = localStorage.getItem('token_phone_scheduling');

    if (!token) {
      this.route.navigate(['login']);
      return false;
    }

    return true;
  }
}
