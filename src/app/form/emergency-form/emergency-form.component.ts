import { Component, EventEmitter, OnInit } from '@angular/core';
import { IForm, FormEvent } from '@app/interfaces';

@Component({
  selector: 'app-emergency-form',
  templateUrl: './emergency-form.component.html',
  styleUrls: ['./emergency-form.component.scss']
})
export class EmergencyFormComponent implements IForm, OnInit {

  isShowEmergencyHelp: boolean = false;


  constructor() { }

  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  evaluate(config: any): boolean {
    return false;
  }

  ngOnInit(): void {
  }

  onShowEmergencyHelp($event: any) {
    this.isShowEmergencyHelp = true;
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
