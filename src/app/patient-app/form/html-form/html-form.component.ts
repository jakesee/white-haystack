import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormEvent, IForm } from '@app/interfaces';

@Component({
  selector: 'app-html-form',
  templateUrl: './html-form.component.html',
  styleUrls: ['./html-form.component.scss']
})
export class HtmlFormComponent implements IForm, OnInit {

  title: string;
  html: string;

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
