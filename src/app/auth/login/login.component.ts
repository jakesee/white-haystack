import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@app/data.service';
import { PageBase } from '@app/page/page-base';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends PageBase implements OnInit {

  form: FormGroup;

  isShowPassword: boolean = false;

  isEmailLogin: boolean = true;

  error;
  loading;

  constructor(private _auth: AuthenticationService, protected _dateService: DataService) {
    super(_dateService);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });


    if (this._auth.isLoggedIn()) {
      this._auth.navigateToReturnUrl();
    }
  }

  get f() {
    return this.form.controls;
  }

  async onLogin($event) {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    return await this._auth.logIn(this.f.username.value, this.f.password.value).toPromise().then((data) => {
      this._auth.navigateToReturnUrl();
    });
  }
}
