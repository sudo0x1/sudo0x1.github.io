import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import { TokenStorageService } from './demo/service/TokenStorageService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
    private role: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;
    
    layoutMode = 'static';

    darkMenu = false;

    profileMode = 'inline';

    ripple = true;

    inputStyle = 'outlined';

    constructor(private router:Router,private primengConfig: PrimeNGConfig,private tokenService:TokenStorageService) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    logout(): void {
        this.tokenService.signOut();
        window.location.reload();
    }
}
