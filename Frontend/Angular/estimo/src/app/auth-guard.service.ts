import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService, authServiceToken } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        @Inject(authServiceToken) private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.authToken) {
            return true;
        }
        this.router.navigate(['/login', { nextUrl: state.url }]);
        return false;
    }
}