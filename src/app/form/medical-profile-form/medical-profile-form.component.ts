import { Component, EventEmitter, OnInit } from '@angular/core';
import { IForm, FormEvent } from '@app/interfaces';

@Component({
  selector: 'app-medical-profile-form',
  templateUrl: './medical-profile-form.component.html',
  styleUrls: ['./medical-profile-form.component.scss']
})
export class MedicalProfileFormComponent implements IForm, OnInit {

  constructor() { }
  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  evaluate(config: any): boolean {
    Object.assign(this, config);

    return false;
  }

  ngOnInit(): void {
  }

  onNext($event) {
    this.nextHandler.emit(new FormEvent(this));
  }

  onBack($event) {
    this.backHandler.emit(new FormEvent(this));
  }

  onCancel($event) {
    this.cancelHandler.emit(new FormEvent(this));
  }

}
