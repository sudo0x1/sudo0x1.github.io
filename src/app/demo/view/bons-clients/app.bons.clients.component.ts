import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from '../../domain/User';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../service/TokenStorageService';

@Component({
    templateUrl: './app.bons.clients.component.html',
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
export class AppBonsClientsComponent implements OnInit {

    userDialog: boolean;

    users: User[];
    user: User;
    selectedUsers: User[];
    submitted: boolean;
    update: boolean;
    cols_user: any[];
    formData: FormData;

    constructor( private userservice: UserService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router, private tokenService: TokenStorageService,
        
    ) { }

    ngOnInit() {
        if (!this.tokenService.is_BANQUIER()) {
            this.messageService.add({ severity: 'warning', summary: 'WARNING', detail: "Vous n'aveez pas le droit d'acceder a cette page!", life: 3000 });
            this.router.navigateByUrl('/client');
        }
        this.update = false;
        this.formData = new FormData();
        this.userservice.getAllClients().subscribe(data => {
            this.users = data.data.filter((item:any) => item.balance > 20000);
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

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
        this.update = true;
        // this.selectedDepartment = <any>this.user.department;
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
        // this.user.department = <Department>this.selectedDepartment;
        if (!this.update) {
            this.formData.append('user', new Blob([JSON.stringify(this.user)], { type: 'application/json' }));
            this.userservice.saveUser(this.formData).subscribe(data => {
                this.userDialog = false;
                this.user = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur créé.', life: 3000 });
                this.ngOnInit();
            }, err => {
                this.formData = new FormData();
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000 });
            });
        } else {
            this.userservice.updateUser(this.user.id, this.user).subscribe(data => {
                this.userDialog = false;
                this.user = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur mis à jour.', life: 3000 });
                this.ngOnInit();
            }, err => {
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000 });
            });
            // if (this.uploadedImage) {
            //     this.formData.append("file", this.uploadedImage);
            //     // this.userservice.updatePhoto(this.user.id, this.formData).subscribe(data => {
            //     //     this.userDialog = false;
            //     //     this.user = {};
            //     //     this.formData = new FormData();
            //     //     this.uploadedImage = null;
            //     //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Image mise à jour.', life: 3000 });
            //     //     this.ngOnInit();
            //     // }, err => {
            //     //     this.formData = new FormData();
            //     //     this.uploadedImage = null;
            //     //     this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000 });
            //     // });
            // }
            this.update = false;
        }
    }
   
    viewEmploye(employee: User) {
        localStorage.setItem("employee", JSON.stringify(employee));
        this.router.navigateByUrl(`admin/allemployees/${employee.id}`, { state: employee })
    }
}
