import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../service/TokenStorageService';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <img class="profile-image" src="/assets/img1.jpg" />
                <span class="profile-name">{{user.username}}</span>
                <i class="pi pi-fw pi-chevron-down"></i>
                <span class="profile-role">{{user.roles[0]}}</span>
            </a>
        </div>

        <ul id="profile-menu" class="layout-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem">
                <a [routerLink]="['/profile']" [attr.tabindex]="!active ? '-1' : null">
                    <i class="pi pi-user"></i>
                    <span>Profil</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Profile</div>
                </div>
            </li>
            <li role="menuitem">
                <a [routerLink]="['/profile']" [attr.tabindex]="!active ? '-1' : null">
                    <i class="pi pi-fw pi-lock"></i>
                    <span>Confidentialité</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Privacy</div>
                </div>
            </li>
            <li role="menuitem">
                <a [routerLink]="['/profile']" [attr.tabindex]="!active ? '-1' : null">
                    <i class="pi pi-cog"></i>
                    <span>Paramètres</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Settings</div>
                </div>
            </li>
            <li role="menuitem">
                <a  [routerLink]="['/login']"  [attr.tabindex]="!active ? '-1' : null" (click)="logout()">
                    <i class="pi pi-sign-out"></i>
                    <span>Déconnexion</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <button class="layout-menu-tooltip-text" (click)="logout()">Logout1</button>
                </div>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent {
    user : any;
    active: boolean;
    constructor(private router:Router,private tokenService:TokenStorageService){
        this.user = tokenService.getUser();
    };
    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
    logout(){
        localStorage.clear();
        this.tokenService.signOut();
    }
}
