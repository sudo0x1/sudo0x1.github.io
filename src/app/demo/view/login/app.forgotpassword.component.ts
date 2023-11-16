import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/AuthService';
import { TokenStorageService } from '../../service/TokenStorageService';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './app.forgotpassword.component.html',
  styleUrls:["./index.css"],
  providers: [ConfirmationService]
})
export class AppForgotPasswordComponent implements OnInit{
  // form: any = {
  username:string;
  password:string;
  // };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {

    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().role;
        this.messageService.add({severity: 'success', summary: 'Success', detail: "Welcome", life: 4000});
        this.router.navigate(['/'])
        // this.reloadPage();
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message, life: 4000});
        // this.errorMessage = err.message;
        // console.log(err.error.message);
        // this.isLoginFailed = true;
      }
    );
  }
  
  reloadPage(): void {
    window.location.reload();
  }

}
