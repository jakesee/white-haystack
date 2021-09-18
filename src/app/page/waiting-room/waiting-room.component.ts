import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { AppointmentCardControlComponent } from '@app/control/appointment-card-control/appointment-card-control.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  user: any;
  chatEpisode: any;

  @Input() isShowTodayFirst = false;

  selectedPeriod: "today" | "future" | "past" = "today";

  today: Array<any> = [];
  future: Array<any> = [];
  past: Array<any> = [];

  constructor(auth: AuthenticationService) {
    this.user = auth.currentUser;

    this.user.episodes.forEach(e => {
      let now = new Date();
      let apptDate = new Date(e.startAt);
      if (apptDate >= now) {
        this.future.push(e);
      } else {
        this.past.push(e);
      }

      let today = now.setHours(0, 0, 0, 0);
      let apptDay = apptDate.setHours(0, 0, 0, 0);
      if (today == apptDay) {
        this.today.push(e);
      }

    });

    this._selectInitialPeriod();

  }

  ngOnInit() { }

  private _selectInitialPeriod() {
    if (this.today.length != 0) this.selectedPeriod = 'today';
    else if (this.future.length != 0) this.selectedPeriod = 'future';
    else if (this.past.length != 0) this.selectedPeriod = 'past';
    else this.selectedPeriod = 'today';
  }

  onSelectPeriod(period: "today" | "future" | "past") {
    this.selectedPeriod = period;
  }

  onChatOpen($event: any) {
    this.chatEpisode = $event.episode;
    console.log($event);
  }

  onChatClose($event: any) {
    this.chatEpisode = null;
  }
}
