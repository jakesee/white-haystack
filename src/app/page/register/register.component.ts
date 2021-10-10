import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';
import { PageBase } from '../page-base';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends PageBase implements OnInit {

  isShowPassword: boolean = false;

  form: FormGroup;

  constructor(protected _dataService: DataService, private _auth: AuthenticationService) {
    super(_dataService);
  }

  isEmailLogin: boolean = true;

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  onRegister($event: any): void {
    this._auth.register(this.f.username.value, this.f.password.value).toPromise().then((data) => {
      this._auth.navigateToReturnUrl();
    });
  }
}
