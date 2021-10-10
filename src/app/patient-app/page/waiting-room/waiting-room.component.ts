import { Component, Input, OnInit } from '@angular/core';
import { Appointment, AppointmentControllerService } from '@app/appointment-controller.service';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';
import { IUser } from '@app/interfaces';
import * as _ from 'lodash';
import { PageBase } from '../page-base';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent extends PageBase implements OnInit {

  user: IUser;
  chatEpisode: any;

  @Input() isShowTodayFirst = false;

  selectedPeriod: "today" | "future" | "past" = "today";

  today: Array<Appointment> = [];
  future: Array<Appointment> = [];
  past: Array<Appointment> = [];

  constructor(auth: AuthenticationService, protected _dataService: DataService, private appointmentController: AppointmentControllerService) {
    super(_dataService);

    this.user = auth.currentUser as IUser;
    let appointments = appointmentController.getAppointmentsByPatient(this.user.id);
    appointments = _.orderBy(appointments, ['startAt'], ['desc']);
    appointments.forEach(e => {
      let now = new Date();
      let apptDate = new Date(e.endAt);
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
  }

  onChatClose($event: any) {
    this.chatEpisode = null;
  }
}
