import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@app/interfaces';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  currentUser:User

  constructor(private _http: HttpClient, private _router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.currentUser) {
      return true; // logged in so can proceed to activate route
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], { queryParams: { returnURL: state.url } });
    return false;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  logIn(username: string, password: string): Observable<any> {

    console.log("AuthenticationService::logIn");

    return this._http.post<any>(`${environment.apiUrl}/user/authenticate`, { username, password })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user;
          return this.currentUser;
        })
      );
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
