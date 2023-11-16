import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/demo/service/AuthService';
import { TokenStorageService } from 'src/app/demo/service/TokenStorageService';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(private router : Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  canActivate() {
    if(this.isLoggedIn()) return true;
    this.router.navigate(['login'])
    return true;
  }

  isLoggedIn(){
    return this.tokenStorage.getToken()!=null;
  }

}
