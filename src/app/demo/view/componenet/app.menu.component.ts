import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-menu',
    template: `
    <ul class="layout-menu layout-main-menu clearfix">
        <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
    </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    ngOnInit() {
        this.model = [
            {
                label: 'Tableau de bord', icon: 'pi pi-chart-line',
                items: [
                    {
                        label: 'Tableau de bord', icon: 'pi pi-chart-line', routerLink: ['/admin/dashboards'],
                    }
                ]
            },
            {
                label: 'Gestion de Clients',
                 icon: 'pi pi-users',
                items: [
                    {
                        label: 'Liste des Clients', icon: 'pi pi-fw pi-users', routerLink: ['/admin/clients'] ,
            
                    },
                ]
            },
            {
                label: 'Gestion de bons Clients',
                 icon: 'pi pi-users',
                items: [
                    {
                        label: 'Liste des bons Clients', icon: 'pi pi-fw pi-users', routerLink: ['/admin/bons-clients'] ,
            
                    },
                ]
            },
            {
                label: 'Gestion de Comptes',
                 icon: 'pi pi-users',
                items: [
                    {
                        label: 'Liste des comptes', icon: 'pi pi-fw pi-users', routerLink: ['/admin/accounts'] ,
            
                    },
                ]
            },
          
         
        ];
    }
}
