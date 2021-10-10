import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';
import { FormEvent, IForm, IUser } from '@app/interfaces';

@Component({
  selector: 'app-select-account-form',
  templateUrl: './select-account-form.component.html',
  styleUrls: ['./select-account-form.component.scss']
})
export class SelectAccountFormComponent implements IForm, OnInit {

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  contact: string;
  email: string;
  gender: string;
  birthdate: Date;
  nationalId: string;

  constructor(private _dataService: DataService, private _auth: AuthenticationService) {
    if (this.isLoggedIn) {
      this._populateForm(this._auth.currentUser);
    }
  }

  nextHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  backHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();
  cancelHandler: EventEmitter<FormEvent> = new EventEmitter<FormEvent>();

  evaluate(config: any): boolean {
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

  logIn($event): boolean {
    this._auth.logIn(this.username, this.password).toPromise().then((response) => {
      const user: IUser = response.data;
      this._populateForm(user);
    });
    return false;
  }

  get isLoggedIn(): boolean {
    return this._auth.isLoggedIn();
  }

  private _populateForm(user: IUser): void {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.contact = user.contact;
    this.email = user.email;
    this.gender = user.gender;
    this.birthdate = user.birthdate;
    this.nationalId = user.nationalId;
  }

}
