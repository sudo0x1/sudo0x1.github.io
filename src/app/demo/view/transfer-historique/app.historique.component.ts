import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from '../../domain/User';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../service/TokenStorageService';

@Component({
    templateUrl: './app.historique.component.html',
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
export class AppHistoriqueComponent implements OnInit {


    transferts: any[];
    user: User;
    selectedTransfert: any[];
    submitted: boolean;
    update: boolean;
    cols_user: any[];
    client:any;
    

    constructor( private userservice: UserService, private router: Router, private tokenService: TokenStorageService,
        
    ) { 
        this.client = this.tokenService.getUser();
    }

    ngOnInit() {
        // if (!this.tokenService.is_BANQUIER()) {
        //     console.log(this.tokenService.is_BANQUIER());
        //     this.messageService.add({ severity: 'warning', summary: 'WARNING', detail: "Vous n'aveez pas le droit d'acceder a cette page!", life: 3000 });
        //     this.router.navigateByUrl('/client');
        // }
        // this.update = false;
        // this.formData = new FormData();
        this.userservice.getHistoriqueTransactions(this.client.id).subscribe(data => {
            this.transferts = data;
        }, err => { });
        this.cols_user = [
            { field: 'client id', header: 'Client Id' },
            { field: 'benificaire id', header: 'Benificaire id' },
            { field: 'montant', header: 'Montant' },
            { field: 'date', header: 'Date' }
        ];

    }

   
}
