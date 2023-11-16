import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/AuthService';
import { TokenStorageService } from '../../service/TokenStorageService';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls:["./index.css"],
  providers: [ConfirmationService]
})
export class AppLoginComponent implements OnInit{

  // isLoggedIn = false;
  // isLoginFailed = false;
  // errorMessage = '';
  // roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // if(this.tokenStorage.getToken()){
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }
  reloadPage(): void {
    window.location.reload();
  }

}
