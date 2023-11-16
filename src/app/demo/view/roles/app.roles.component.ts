import {Component, OnInit} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Role } from '../../domain/role';
import { RoleService } from '../../service/roleService';
import { Permission } from '../../domain/permission';
import { RolePermission } from '../../domain/RolePermission';
import { FormControl } from '@angular/forms';
import { TokenStorageService } from '../../service/TokenStorageService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './app.roles.component.html',
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
    providers: [MessageService, ConfirmationService,FormControl]
})
export class AppRolesComponent implements OnInit {

    roleDialog: boolean;

    roles: Role[];
    
    permissions : Permission[];
    
    permission:Permission;
    permissionId:Permission;


    role: Role;
    datafinal = [];
    rolePermissions:RolePermission;
    selectedRoles: Role[];

    submitted: boolean;

    cols: any[];
    update:boolean;
    selectedValue:string[];
    checkboxValue: boolean = true;
    isChecked: boolean = true;

    constructor(
        private roleService: RoleService, 
        private tokenService:TokenStorageService,
        private messageService: MessageService,
        private route: ActivatedRoute, 
        private router: Router, 
        private confirmationService: ConfirmationService) {}

    ngOnInit() {
        // if(!this.tokenService.is_SUPER_ADMIN()){
        //     console.log(this.tokenService.is_SUPER_ADMIN());
        //     this.messageService.add({severity: 'error', summary: 'WARNING', detail: "Vous n'aveez pas le droit d'acceder a cette page!", life: 3000});
        //     this.router.navigateByUrl('/employee');
        // }
        this.isChecked = true;
        this.rolePermissions = 
                {
                    "id":null,
                    "canView":false,
                    "canCreate":false,
                    "canEdit":false,
                    "canDelete":false,
                    "permission_id":null,
                };
        
        this.update = false;
        this.roleService.getAllRoles().subscribe(data => {
            this.roles = data;
        },err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Erreur lors de la récupération des données', life: 3000});
        });
       

       

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Name' },
            { field: 'created_at', header: 'Created At' },
            { field: 'updated_at', header: 'Updated At' },
          
        ];
        
    }

    openNew() {
        this.role = {
            "id":null,
            "name":"",
            "rolePermissions":[]
        };
        this.submitted = false;
        this.roleDialog = true;
        this.permissions.forEach((item) => {
            this.rolePermissions.permission_id = item.id;
            this.role.rolePermissions.unshift(this.rolePermissions);
            this.rolePermissions = 
            {
                "id":null,
                "canView":false,
                "canCreate":false,
                "canEdit":false,
                "canDelete":false,
                "permission_id":null,
            };
        });
        
    }

    deleteSelectedRoles() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr(e) de vouloir supprimer les rôles sélectionnés ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
                this.selectedRoles = null;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Rôles supprimés', life: 3000});
            }
        });
    }

    editRole(role: Role) {
        this.role = {...role};
        this.roleDialog = true;
        this.update = true;
    }

    deleteRole(role: Role) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr(e) de vouloir supprimer  ' + role.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roleService.deleteRole(role.id).subscribe(data => {
                    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Rôle supprimé.', life: 3000});
                    this.ngOnInit();
                },err => {
                    this.messageService.add({severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000});
                    this.ngOnInit();
                });
                this.role = {};
            }
        });
    }

    hideDialog() {
        this.roleDialog = false;
        this.submitted = false;
    }

    saveRole() {
        this.submitted = true;
        if(!this.update){
         
            this.roleService.saveRole(this.role).subscribe(data => {
                this.roleDialog = false;
                this.role = {};
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Rôle créé.', life: 3000});
                this.ngOnInit();
            },err => {
                this.roleDialog = false;
                this.role = {};
                this.messageService.add({severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000});
                this.ngOnInit();
            });

        }else{
            console.log("update");
    
            this.roleService.updateRole(this.role.id,this.role).subscribe(data => {
                this.roleDialog = false;
                this.role = {};
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Rôle mis à jour.', life: 3000});
                this.ngOnInit();
            },err => {
                this.roleDialog = false;
                this.role = {};
                this.messageService.add({severity: 'error', summary: 'Successful', detail: 'Erreur, réessayez.', life: 3000});
                this.ngOnInit();
            });
            this.update = false;
        }

    }
 
    handlecanView(event: any,id:any) {
        this.role.rolePermissions.filter(item => item.permission_id === id)[0].canView =  !this.containesAutorite1(id);
    }
    handlecanCreate(event: any,id:any) {
        this.role.rolePermissions.filter(item => item.permission_id === id)[0].canCreate = !this.containesAutorite2(id);
    }
    handlecanEdit(event: any,id:any){
        this.role.rolePermissions.filter(item => item.permission_id === id)[0].canEdit = !this.containesAutorite3(id);
    }
    handlecanDelete(event: any,id:any) {
        this.role.rolePermissions.filter(item => item.permission_id === id)[0].canDelete = !this.containesAutorite4(id);
    }
    containesAutorite1(id:any):boolean {
        return this.role.rolePermissions.filter(item => item.permission_id === id)[0].canView === true;
    }
    containesAutorite2(id:any):boolean {
        return this.role.rolePermissions.filter(item => item.permission_id === id)[0].canCreate === true;
    }
    containesAutorite3(id:any):boolean {
        return this.role.rolePermissions.filter(item => item.permission_id === id)[0].canEdit === true;
    }
    containesAutorite4(id:any):boolean {
        return this.role.rolePermissions.filter(item => item.permission_id === id)[0].canDelete === true;
    }

}
