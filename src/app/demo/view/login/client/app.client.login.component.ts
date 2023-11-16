import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/AuthService';
import { TokenStorageService } from 'src/app/demo/service/TokenStorageService';

@Component({
  selector: 'app-login',
  templateUrl: './app.client.login.component.html',
  styleUrls:["./index.css"],
  providers: [ConfirmationService]
})
export class AppEmployeeLoginComponent implements OnInit{
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
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.messageService.add({severity: 'success', summary: 'Success', detail: "Welcome", life: 4000});
        if(this.roles.includes("BANQUIER")){
          this.router.navigate(["/admin"]);
        }else if(this.roles.includes("CLIENT")){
            this.router.navigate(["/client"]);
        }else{
            
        }
       
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message, life: 4000});
     
      }
    );
  }
  
  reloadPage(): void {
    window.location.reload();
  }

}
