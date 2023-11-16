import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from '../../domain/User';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../service/TokenStorageService';

@Component({
    templateUrl: './app.clients.component.html',
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
export class AppClientsComponent implements OnInit {

    userDialog: boolean;

    users: any[];
    user: any;
    selectedUsers: any[];
    submitted: boolean;
    update: boolean;
    cols_user: any[];

    constructor( private userservice: UserService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router, private tokenService: TokenStorageService,
        
    ) { }

    ngOnInit() {
        if (!this.tokenService.is_BANQUIER()) {
            console.log(this.tokenService.is_BANQUIER());
            this.messageService.add({ severity: 'warning', summary: 'WARNING', detail: "Vous n'aveez pas le droit d'acceder a cette page!", life: 3000 });
            this.router.navigateByUrl('/client');
        }
        this.update = false;
        this.userservice.getAllClients().subscribe(data => {
            this.users = data.data;
        }, err => { });
        this.cols_user = [
            { field: 'username', header: 'UserName' },
            { field: 'email', header: 'Email' },
            { field: 'phone', header: 'Phone' },
            { field: 'solde', header: 'solde' }
        ];

    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr(e) de vouloir supprimer les utilisateurs sélectionnés ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedUsers.map((user) => {
                    this.userservice.deleteUser(user.id).subscribe(data => {

                    }, err => {

                    });
                });
                this.selectedUsers = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateurs supprimés.', life: 3000 });
                this.ngOnInit();
            }
        });
    }

    editUser(user: User,flag:boolean) {
        this.update = flag;
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr(e) de vouloir supprimer  ' + user.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userservice.deleteUser(user.id).subscribe(data => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé.', life: 3000 });
                    this.ngOnInit();
                }, error => {
                    this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000 });
                    this.ngOnInit();
                });
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
        if (!this.update) {
            this.userservice.saveClient(this.user).subscribe(data => {
                this.userDialog = false;
                this.user = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client créé.', life: 3000 });
                this.ngOnInit();
            }, err => {
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000 });
            });
        } else {
            this.userservice.updateUser(this.user.id, this.user).subscribe(data => {
                this.userDialog = false;
                this.user = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client mis à jour.', life: 3000 });
                this.ngOnInit();
            }, err => {
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000 });
            });
            this.update = false;
        }
    }
    toggleSwitch(event:any,user:any){
        console.log(user.enabled);
        this.userservice.enableUser(user.id).subscribe((data) => {
                this.user.enabled = !user.enabled;
                
        });
        // this.user.enable = !this.user.enable;
    }
   
}
