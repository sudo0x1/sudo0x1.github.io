import { Component, OnInit } from '@angular/core';

import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Role } from '../../domain/role';
import { Router } from '@angular/router';
import { User } from '../../domain/User';
import { UserService } from '../../service/user.service';
import { TokenStorageService } from '../../service/TokenStorageService';

@Component({
    templateUrl: './app.accounts.component.html',
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
export class AppAccountsComponent implements OnInit {

    accountDialog: boolean;
    accounts: any[];
    roles: Role[];
    employees: User[];
    account: any;
    selectedAccounts: any[];

    submitted: boolean;
    update: boolean;
    cols_account: any[];
    selectedDrop: SelectItem<Role>;
    selectedEmployee: SelectItem<User>;

    formData: FormData;

    constructor( private userservice: UserService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router,
        private tokenService:TokenStorageService,
        ) { }

    ngOnInit() {
        if (!this.tokenService.is_BANQUIER()) {
            // console.log(this.tokenService.is_SUPER_ADMIN());
            this.messageService.add({ severity: 'warning', summary: 'WARNING', detail: "Vous n'aveez pas le droit d'acceder a cette page!", life: 3000 });
            this.router.navigateByUrl('/employee');
        }
        this.update = false;
        this.formData = new FormData();
        this.userservice.getAllUsers().subscribe(data => {
            this.accounts = data.data;
        }, err => { });
       
        // this.userservice.getAllUsers().subscribe(data => {
        //     this.employees = data.data;
        // }, err => { });


        this.cols_account = [
            { field: 'username', header: 'UserName' },
            { field: 'role', header: 'Role' },
            { field: 'email', header: 'Email' },
            // { field: 'employee', header: 'Employee' }
        ];

    }

    openNew() {
        this.account = {};
        this.submitted = false;
        this.accountDialog = true;
    }

    deleteSelectedAccounts() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr(e) de vouloir supprimer les comptes sélectionnés?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedAccounts.map((account) => {
                    this.userservice.deleteUser(account.id).subscribe(data => { });
                });
                this.selectedAccounts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Comptes supprimés', life: 3000 });
                this.ngOnInit();
            }
        });
    }

    editAccount(account: any) {
        this.account = { ...account };
        this.accountDialog = true;
        this.update = true;
        this.selectedEmployee = <any>this.account.employee;
        this.selectedDrop = <any>this.account.role;
    }

    deleteAccount(account: any) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr(e) de vouloir supprimer  ' + account.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userservice.deleteUser(account.id).subscribe(data => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Compte supprimé', life: 3000 });
                    this.ngOnInit();
                }, error => {
                    this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez', life: 3000 });
                    this.ngOnInit();
                });
            }
        });
    }

    hideDialog() {
        this.accountDialog = false;
        this.submitted = false;
    }

    saveAccount() {
        this.submitted = true;
        this.account.role = <Role>this.selectedDrop;
        this.account.employee = <User>this.selectedEmployee;
        if (!this.update) {

            this.userservice.saveUser(this.account).subscribe(data => {
                this.accountDialog = false;
                this.account = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Compte créé', life: 3000 });
                this.ngOnInit();
            }, err => {
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez', life: 3000 });
            });
        } else {
            this.userservice.updateUser(this.account.id, this.account).subscribe(data => {
                this.accountDialog = false;
                this.account = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Compte mis à jour', life: 3000 });
                this.ngOnInit();
            }, err => {
                this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez', life: 3000 });
            });
            this.update = false;
        }
    }
    viewAccount(account: any) {
    }
    onChange(){
        this.account.email = (<User>this.selectedEmployee).email;
    }
}
