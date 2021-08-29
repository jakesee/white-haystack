import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Form, FormEvent } from '../interfaces';

@Component({
  selector: 'app-triage-form',
  templateUrl: './triage-form.component.html',
  styleUrls: ['./triage-form.component.scss']
})
export class TriageFormComponent implements Form, OnInit {
  progress: number = 0;
  progressMax: number = 0;
  onNext: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  onBack: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  onCancel: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  questionText: string = 'How can I help you today?';
  form = new FormGroup({
    answer: new FormControl()
  });

  constructor(private _dataService: DataService) {}

  init(config: any, progress: number, progressMax: number) {
    console.log(config);
    this.progress = progress;
    this.progressMax = progressMax;
    this.questionText = config.questionText;
  }

  ngOnInit() {}

  next($event:any) {
    this._dataService.state.push(this.form.value.answer);
    this.onNext.emit(new FormEvent(this));
  }

  back($event: any) {
    this.onBack.emit(new FormEvent(this));
  }

  cancel($event: any) {
    this.onCancel.emit(new FormEvent(this));
  }
}
