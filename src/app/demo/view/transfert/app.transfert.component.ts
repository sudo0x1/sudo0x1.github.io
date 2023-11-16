import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../service/TokenStorageService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './app.transfert.component.html',
    styleUrls: ['../../view/tabledemo.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }

        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
    providers: [MessageService, ConfirmationService]
})
export class AppTransfertComponent implements OnInit {

    fundTransfer:any = {};
    montant:number;
    beneficiaireId:any;
    client :any ;
    user:any;

      constructor(           private userservice: UserService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router, private tokenService: TokenStorageService,
         
    ) { 
      this.client = this.tokenService.getUser();
    }

      ngOnInit(): void {
        this.userservice.getUserById(this.client.id).subscribe((data)=> {
            this.user = data.data;
        });
        this.initFundTransferForm();
      }
    
      initFundTransferForm(): void {
        this.fundTransfer = {
          clientId:this.client.id,
          montant: null, 
          beneficiaireId: null
        };
      }
      save():void{
        // console.log(this.fundTransferForm.value);
        this.fundTransfer.beneficiaireId = this.beneficiaireId;
        this.fundTransfer.montant = this.montant;

        this.userservice.transferArgent(this.fundTransfer).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transfert done.', life: 3000 });
          // this.ngOnInit();
        }, err => {
            this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000 });
        });
      }
      
       

    

   
}
