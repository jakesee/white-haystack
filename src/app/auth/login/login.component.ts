import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ɵangular_packages_router_router_b } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  returnUrl: string | null;
  error;
  loading;

  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    if (this._authenticationService.currentUser) {
      this._router.navigate([this.returnUrl]);
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit($event) {

    console.log("LoginComponent::onSubmit");
    console.log(this.f.username.errors);

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }


    this._authenticationService.logIn(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
        data => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
