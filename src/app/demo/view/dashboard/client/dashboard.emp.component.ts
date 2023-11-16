import {Component, OnInit} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UserService } from 'src/app/demo/service/user.service';
import { TokenStorageService } from 'src/app/demo/service/TokenStorageService';


@Component({
    templateUrl: './dashboard.emp.component.html',
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
export class DashboardEmpComponent implements OnInit {

   
    users: any[];
    chartData: any;
    events: any[];
    selectedCity: any;
    fullcalendarOptions: any;
    userCount:number;
    active_users:number;
    nombre_transfert_by_user:number=0;
    data_item:any;
    data: any;
    constructor(private userService: UserService,private messageService:MessageService,private tokenService:TokenStorageService) { 
        this.events = [

        ];
    }

    ngOnInit() {   
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
