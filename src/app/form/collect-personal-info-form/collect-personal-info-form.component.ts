import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';
import { Form, FormEvent, User } from '@app/interfaces';

@Component({
  selector: 'app-collect-personal-info-form',
  templateUrl: './collect-personal-info-form.component.html',
  styleUrls: ['./collect-personal-info-form.component.scss']
})
export class CollectPersonalInfoFormComponent implements Form, OnInit {
  progress: number = 0;
  progressMax: number = 0;
  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  title: string = '';

  form: FormGroup;

  constructor(private _dataService: DataService, private _auth: AuthenticationService) {}

  init(config: any) {
    this.title = config.title;
  }

  onNext($event: any) {
    this._dataService.state.push(Object.values(this.form.value));
    this.nextHandler.emit(new FormEvent(this));
  }

  onBack($event: any) {
    this.backHandler.emit(new FormEvent(this));
  }

  onCancel($event: any) {
    this.cancelHandler.emit(new FormEvent(this));
  }

  ngOnInit() {
    console.log(this.user);
     this.form = new FormGroup({
       firstName: new FormControl(this.user.firstName),
       lastName: new FormControl(this.user.lastName),
       gender: new FormControl(this.user.gender),
       birthdate: new FormControl(this.user.birthdate),

       medicalCondition: new FormControl(this.user.medicalCondition),
       medication: new FormControl(this.user.medication),
       allergies: new FormControl(this.user.allergies),
     });
  }

  get user(): User {
    return this._auth.currentUser;
  }
}
