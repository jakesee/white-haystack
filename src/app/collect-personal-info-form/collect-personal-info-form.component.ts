import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Form, FormEvent } from '../interfaces';

@Component({
  selector: 'app-collect-personal-info-form',
  templateUrl: './collect-personal-info-form.component.html',
  styleUrls: ['./collect-personal-info-form.component.css']
})
export class CollectPersonalInfoFormComponent implements Form, OnInit {
  progress: number;
  progressMax: number;
  onNext: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  onBack: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  onCancel: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  title: string;

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl()
  });

  constructor() {}

  init(config: any, progress: number, progressMax: number) {
    this.progress = progress;
    this.progressMax = progressMax;
    this.title = config.title;
    console.log(config);
  }

  next($event) {
    this.onNext.emit(new FormEvent(this));
  }

  back($event) {
    this.onBack.emit(new FormEvent(this));
  }

  cancel($event) {
    this.onCancel.emit(new FormEvent(this));
  }

  ngOnInit() {}
}
