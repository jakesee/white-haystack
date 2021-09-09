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

  error;
  loading;

  constructor(private _authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });


    if (this._authenticationService.isLoggedIn()) {
      this._authenticationService.navigateToReturnUrl();
    }
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit($event) {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    console.log("this._authenticationService.logIn");
    await this._authenticationService.logIn(this.f.username.value, this.f.password.value).then((data) => {
      this._authenticationService.navigateToReturnUrl();
      console.log("navigated");
    });
    console.log("submitted");
  }
}
