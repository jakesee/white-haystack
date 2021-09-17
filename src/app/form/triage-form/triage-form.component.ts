import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '@app/data.service';
import { Form, FormEvent } from '@app/interfaces';

@Component({
  selector: 'app-triage-form',
  templateUrl: './triage-form.component.html',
  styleUrls: ['./triage-form.component.scss']
})
export class TriageFormComponent implements Form, OnInit {

  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  questionText: string = 'How can I help you today?';
  form = new FormGroup({
    answer: new FormControl()
  });

  constructor(private _dataService: DataService) {}

  evaluate(config: any): boolean {
    this.questionText = config.questionText;

    return false;
  }

  ngOnInit() {}

  next($event:any) {
    this._dataService.state.push(this.form.value.answer);
    this.nextHandler.emit(new FormEvent(this));
  }

  back($event: any) {
    this.backHandler.emit(new FormEvent(this));
  }

  cancel($event: any) {
    this.cancelHandler.emit(new FormEvent(this));
  }
}
