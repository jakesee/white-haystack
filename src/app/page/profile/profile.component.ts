import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';
import { User } from '@app/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _dataService: DataService, private _auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this._auth.currentUser;
  }

  on2FAToggle($event) {

    let newState = $event.target.checked;
  }

}
