import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  user:any;

  constructor(auth: AuthenticationService) {
    this.user = auth.currentUser;
  }

  ngOnInit() {}
}
