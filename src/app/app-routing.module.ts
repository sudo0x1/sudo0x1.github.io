import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { AppClientsComponent } from './demo/view/clients/app.clients.component';
import { AppErrorComponent } from './demo/view/error/app.error.component';
import { AppAccessdeniedComponent } from './demo/view/accessdenied/app.accessdenied.component';
import { AppNotfoundComponent } from './demo/view/notfound/app.notfound.component';
import { AppLoginComponent } from './demo/view/login/app.login.component';
import { AuthenticationGuard } from './guards/auth/authentication/authentication.guard';
import { AppMainComponent } from './demo/view/componenet/app.main.component';
import { AppForgotPasswordComponent } from './demo/view/login/app.forgotpassword.component';
import { DashboardAdminComponent } from './demo/view/dashboard/admin/dashboard.admin.component';
import { DashboardEmpComponent } from './demo/view/dashboard/client/dashboard.emp.component';

import { AppAccountsComponent } from './demo/view/accounts/app.accounts.component';
import { AppAdminLoginComponent } from './demo/view/login/admin/app.admin.login.component';
import { AppEmployeeLoginComponent } from './demo/view/login/client/app.client.login.component';
import { ProfileSettingsComponent } from './demo/view/login/profile-settings/profile-settings.component';
import { AppBonsClientsComponent } from './demo/view/bons-clients/app.bons.clients.component';
import { AppTransfertComponent } from './demo/view/transfert/app.transfert.component';
import { AppHistoriqueComponent } from './demo/view/transfer-historique/app.historique.component';
import { AppClientRegisterComponent } from './demo/view/register-client/app.client.register.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent, canActivate:[AuthenticationGuard],
            },
            {
                
                path: 'admin', component: AppMainComponent, canActivate:[AuthenticationGuard],
                children: [
                    {path: '', component: DashboardAdminComponent},
                    {
                        path: 'dashboards', 
                        component: DashboardAdminComponent
                    },
                    {
                        path: 'clients',
                        component: AppClientsComponent,
                    },
                    {
                        path: 'bons-clients',
                        component: AppBonsClientsComponent,
                    },
                  
                    {
                        path: 'accounts',
                        component: AppAccountsComponent,
                    },
                  

                ],                
            },
            {
                path: '', component: AppMainComponent, canActivate:[AuthenticationGuard],
                children:[
                    {
                        path:"profile",
                        component:ProfileSettingsComponent
                    }
                ],
            },
            {
                path:"client",component:AppMainComponent,canActivate:[AuthenticationGuard],
                children:[
                    {
                        path: '', component: DashboardEmpComponent
                    },
                    {
                        path: 'dashboards', component: DashboardEmpComponent
                    },
                    {
                        path: 'transfert', component: AppTransfertComponent
                    },
                    {
                        path: 'transfert-historiques', component: AppHistoriqueComponent
                    },
                    
                ]
                
            },
            
            {path: 'error', component: AppErrorComponent},
            {path: 'accessdenied', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {
                path:'admin/login',component:AppAdminLoginComponent
            },
            {
                path:"client/login",component:AppEmployeeLoginComponent,
                
            },
            {
                path:"client/register",component:AppClientRegisterComponent,
            },
            {path:"forgotpassword",component:AppForgotPasswordComponent},
        ], 
        {
            // scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
