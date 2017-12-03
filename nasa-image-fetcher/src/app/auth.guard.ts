import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserauthService } from './userauth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: UserauthService,
        private router: Router
    ){}
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if(!this.auth.isLoggedIn()){
                //redirect to login page
                this.router.navigate(["/login"]);
                return false;
            }
            return true;
    }
}
