import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import * as _ from 'lodash';
import { AppointmentStatus, IAppointment, IProvider, IUser } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentControllerService {

  constructor(private _data:DataService) { }

  getAppointmentsByPatient(patientId): Appointment[] {

    var patient: IUser = _.find(this._data.db.users, (user) => {
      return user.id == patientId;
    });

    let appts = _.map(_.filter(this._data.db.appointments, (appt) => {
      return appt.patientId == patientId;
    }), (item) => {

      var doctor: IUser = _.find(this._data.db.users, (user) => {
        return user.id == item.doctorId;
      });

      var provider: IProvider = _.find(this._data.db.providers, (provider) => {
        return provider.id == item.providerId;
      });

      return new Appointment(item, patient, doctor, provider);
    });

    return appts;
  }

  getAppointments(): Appointment[] {
    let appts = _.map(this._data.db.appointments, (appt) => {

      var doctor: IUser = _.find(this._data.db.users, (user) => {
        return user.id == appt.doctorId;
      });

      var patient: IUser = _.find(this._data.db.users, (user) => {
        return user.id == appt.patientId;
      });

      var provider: IProvider = _.find(this._data.db.providers, (provider) => {
        return provider.id == appt.providerId;
      });

      return new Appointment(appt, patient, doctor, provider);
    });

    return appts;
  }
}

export class Appointment implements IAppointment {
  id: number;
  episodeId: number;
  providerId: number;
  doctorId: number;
  patientId: number;
  startAt: Date;
  endAt: Date;
  status: AppointmentStatus;

  constructor(appointment: IAppointment, public patient: IUser, public doctor: IUser, public provider: IProvider) {
    Object.assign(this, appointment);
  }
}
