import {Component, OnInit} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UserService } from 'src/app/demo/service/user.service';
import { TokenStorageService } from 'src/app/demo/service/TokenStorageService';
import {  Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.admin.component.html',
    styleUrls: ['../../tabledemo.scss'],
    styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .fc-header-toolbar {
                display: flex;
                flex-wrap: wrap;
            }
        }
    `]
})
export class DashboardAdminComponent implements OnInit {

    users: any[];
    chartData: any;
    events: any[];
    fullcalendarOptions: any;
    client_count:number = 0;
    active_accounts:number = 0;
    data_item:any;
    d:any[];
    logins:any = 0;

   
    constructor(private userService: UserService,private messageService:MessageService,
        private tokenService:TokenStorageService,
        private router: Router,) { 
        this.events = [

        ];
        this.d = [

        ];
    }

    ngOnInit() {
        if (!this.tokenService.is_BANQUIER()) {
            this.messageService.add({ severity: 'warning', summary: 'WARNING', detail: "Vous n'aveez pas le droit d'acceder a cette page!", life: 3000 });
            this.router.navigateByUrl('/client');
        }

    
        this.userService.getAllUsers().subscribe(data => {
            this.users = data.data;
            this.active_accounts = this.users.length;
        },err => {
            
        });

        this.userService.getAllClients().subscribe(data => {
            this.client_count = data.data.length;
        });
       

    
       
       

        this.fullcalendarOptions = {
				plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
				defaultDate: '2023-07-01',
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				editable: true
        };
    }
}
