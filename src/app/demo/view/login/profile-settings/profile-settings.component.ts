import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  constructor() { }

  ngOnInit(): void {
  }
  save(){
    console.log(this.oldPassword);
  }
}
