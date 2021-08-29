import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Form, FormEvent } from '../interfaces';

@Component({
  selector: 'app-collect-personal-info-form',
  templateUrl: './collect-personal-info-form.component.html',
  styleUrls: ['./collect-personal-info-form.component.scss']
})
export class CollectPersonalInfoFormComponent implements Form, OnInit {
  progress: number = 0;
  progressMax: number = 0;
  onNext: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  onBack: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  onCancel: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  title: string = '';

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl()
  });

  constructor(private _dataService: DataService) {}

  init(config: any, progress: number, progressMax: number) {
    this.progress = progress;
    this.progressMax = progressMax;
    this.title = config.title;
    console.log(config);
  }

  next($event: any) {
    this._dataService.state.push(Object.values(this.form.value));
    this.onNext.emit(new FormEvent(this));
  }

  back($event: any) {
    this.onBack.emit(new FormEvent(this));
  }

  cancel($event: any) {
    this.onCancel.emit(new FormEvent(this));
  }

  ngOnInit() {}
}
