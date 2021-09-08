import { Component, EventEmitter, OnInit } from '@angular/core';
import { Form, FormEvent } from '@app/interfaces';

@Component({
  selector: 'app-request-appointment-form',
  templateUrl: './request-appointment-form.component.html',
  styleUrls: ['./request-appointment-form.component.scss']
})
export class RequestAppointmentFormComponent implements Form, OnInit {


  timeslots: Array<number> = [];

  selectedTimeslot: number;

  constructor() {

   }
  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  init(config: any): void {

  }

  ngOnInit() {
    let now = Date.now();
    for (var i = 0; i < 10; i++) {
      var time = now + i * 15 * 60 * 1000;
      this.timeslots.push(time);
    }

    this.selectedTimeslot = this.timeslots[0];
  }

  onSelectTime(timeslot: number) {
    this.selectedTimeslot = timeslot;
    return false;
  }

  onRequestAppointment($event: any) {
    this.nextHandler.emit(new FormEvent(this));
  }

  onBack($event:any) {
    this.backHandler.emit(new FormEvent(this));
  }

  onCancel($event: any) {
    this.cancelHandler.emit(new FormEvent(this));
  }
}
