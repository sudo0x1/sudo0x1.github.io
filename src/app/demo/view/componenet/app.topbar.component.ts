import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { AppMainComponent } from './app.main.component';
import { TokenStorageService } from '../../service/TokenStorageService';
import { Role } from '../../domain/role';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit,OnDestroy {
    notificationsList: Notification[] = [];
    user: any;
    active: boolean;
    role: Role;
    private ngUnsubscribe = new Subject<void>();

    constructor(public app: AppComponent,
        public appMain: AppMainComponent,  private tokenService: TokenStorageService) {
        this.user = tokenService.getUser();
    }

    ngOnInit(): void {
        // this.fetchUnreadNotifications();
        // interval(30000)
        // .pipe(takeUntil(this.ngUnsubscribe))
        // .subscribe(() => {
        //   this.fetchUnreadNotifications();
        // });
    }

    fetchUnreadNotifications(): void {
     
    }

    markNotificationAsRead(notificationId: number): void {
        
    };
    logout() {
        localStorage.clear();
        this.tokenService.signOut();

    }
    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
