import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // not logged in so redirect to login page with the return url
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser !== null) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}