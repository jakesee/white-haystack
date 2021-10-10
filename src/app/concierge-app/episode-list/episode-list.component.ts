import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentControllerService } from '@app/appointment-controller.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  appointments: Appointment[] = [];

  constructor(private _appointmentController: AppointmentControllerService) {
    this.appointments = _appointmentController.getAppointments();
    this.appointments = _.orderBy(this.appointments, ['startAt'], 'desc');
  }

  ngOnInit(): void {
  }

  onCheckout($event:any, episode: any) {
    console.log('checkout', episode);
  }
}
