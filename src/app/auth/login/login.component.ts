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

  onSubmit($event) {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this._authenticationService.logIn(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        complete: () => {
          this._authenticationService.navigateToReturnUrl();
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
      });
  }

}
