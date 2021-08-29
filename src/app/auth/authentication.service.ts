import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@app/interfaces';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  currentUser:User

  constructor(private _http: HttpClient, private _router: Router, private _route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.currentUser) {
      return true; // logged in so can proceed to activate route
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], { queryParams: { returnUrl: (state.url) } });
    return false;
  }

  getReturnUrl(): string {
    return this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  navigateToReturnUrl(): void {
    this._router.navigateByUrl(this.getReturnUrl());
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() != null;
  }

  logIn(username: string, password: string): Observable<any> {

    return this._http.post<any>(`${environment.apiUrl}/user/authenticate`, { username, password })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = User.create(user);
          return this.currentUser;
        })
      );
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
