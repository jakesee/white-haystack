import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  isLogin: boolean = true;

  error;
  loading;

  constructor(private _auth: AuthenticationService) {

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

  onRegister($event: any): void {
    this._auth.register(this.f.username.value, this.f.password.value).toPromise().then((data) => {
      this._auth.navigateToReturnUrl();
    });
  }

  onToggleForm($event: any): boolean {
    this.isLogin = !this.isLogin;

    return false;
  }
}
