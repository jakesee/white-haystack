import { Component, EventEmitter, OnInit } from '@angular/core';
import { Form, FormEvent } from '@app/interfaces';

@Component({
  selector: 'app-next-appointment-info-form',
  templateUrl: './next-appointment-info-form.component.html',
  styleUrls: ['./next-appointment-info-form.component.scss']
})
export class NextAppointmentInfoFormComponent implements Form, OnInit {


  appointmentStartDateTime: string;

  constructor() { }

  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  evaluate(config: any): boolean {
    return false;
  }

  ngOnInit(): void {
    let date = new Date(Date.now() + 15 * 60 * 1000);
    this.appointmentStartDateTime = date.toDateString() + " " + date.toLocaleTimeString();
  }

  onNext($event: any) {
    this.nextHandler.emit(new FormEvent(this));
  }

  onBack($event: any) {
    this.backHandler.emit(new FormEvent(this));
  }

  onCancel($event: any) {
    this.cancelHandler.emit(new FormEvent(this));
  }

}
