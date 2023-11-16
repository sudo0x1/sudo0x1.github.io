import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-menu1',
    template: `
    <ul class="layout-menu layout-main-menu clearfix">
        <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
    </ul>
    `
})
export class AppMenu1Component implements OnInit {

    model: any[];

    ngOnInit() {
        this.model = [
            {
                label: 'Tableau de bord', icon: 'pi pi-chart-line',
                items: [
                    {
                        label: 'Tableau de bord', icon: 'pi pi-fw pi-chart-line', routerLink: ['/client/dashboards'],
                    }
                ]
            },
            {
                label: "Transfert L'argent ",
                 icon: 'pi pi-folder-open',
                
                items: [
                    {
                        label: 'Transfert', icon: 'pi pi-fw pi-folder-open', routerLink: ['/client/transfert'] ,
                      
            
                    },
                ]
            },
       
            {
                label: 'Transfert historiques',
                 icon: 'pi pi-folder',
                
                items: [
                    {
                        label: 'Liste des Transfert', icon: 'pi pi-fw pi-folder', routerLink: ['/client/transfert-historiques'] ,
                      
            
                    },
                ]
            },
         
        ];
    }
}
