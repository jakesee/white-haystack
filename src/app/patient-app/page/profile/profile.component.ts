import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';
import { User } from '@app/interfaces';
import { PageBase } from '../page-base';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends PageBase implements OnInit {

  constructor(_dataService: DataService, private _auth: AuthenticationService) {
    super(_dataService)
   }

  ngOnInit(): void {
  }

  get user(): User {
    return this._auth.currentUser;
  }

  on2FAToggle($event) {

    let newState = $event.target.checked;
  }

}
