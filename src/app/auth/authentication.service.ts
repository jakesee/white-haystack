import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataService } from '@app/data.service';
import { User } from '@app/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Reference: https://jasonwatmore.com/post/2020/07/09/angular-10-jwt-authentication-example-tutorial

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  currentUser = new BehaviorSubject(null);

  constructor(private _http: HttpClient, private _router: Router, private _route: ActivatedRoute, private _dataService: DataService) {
    const user = localStorage.getItem('currentUser');
    this.currentUser.next(user ? User.create(JSON.parse(user)) : null);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    var path = route.routeConfig.path;

    if (this.getCurrentUser()) {
      console.log('current user valid');
      return true; // logged in so can proceed to activate route
    } else if (path == 'provider/:pid') {
      return true;
    } else if (path == 'provider/:pid/journey/:jid') {
      const journeyId = route.params.jid;
      const providerId = route.params.pid;
      return this._dataService.getProvider(providerId).pipe(map(data => {
        if (data.journeys[journeyId].auth) {
          return this._activateAuth(route, state);
        } else {
          return true;
        }
      }));
    } else {
      return this._activateAuth(route, state);
    }
  }

  private _activateAuth(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], { queryParams: { returnUrl: (state.url) } });
    return false;
  }

  logIn(username: string, password: string): Promise<any> {
    return this._http.post<any>(`${environment.apiUrl}/user/authenticate`, { username, password }).toPromise().then(
      user => {
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser.next(User.create(user));
      }
    );
  }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }

  getReturnUrl(): string {
    return this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  navigateToReturnUrl(): void {
    this._router.navigateByUrl(this.getReturnUrl());
  }

  getCurrentUser(): User {
    return this.currentUser.value;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() != null;
  }


}
