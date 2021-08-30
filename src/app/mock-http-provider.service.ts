import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from 'rxjs';


const db = {
  users: [
    { id: 1, username: 'bill.gates@my-doc.com', password: 'mydoc', firstName: 'Bill', lastName: 'Gates', gender: 'Male', birthdate: '10/28/1955' },
    { id: 2, username: 'steve.jobs@my-doc.com', password: 'mydoc', firstName: 'Steve', lastName: 'Jobs', gender: 'Male', birthdate: '02/24/1955' },
    { id: 3, username: 'test', password: 'test', firstName: 'Jake', lastName: 'See', gender: 'Male', birthdate: '01/22/1985' },
  ]
}

@Injectable({
  providedIn: 'root'
})
export class MockHttpProviderService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;

    console.log('MockHttpProviderService:intercept ' + url);

    return of(null)
      .pipe(mergeMap(handleEndpoint))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleEndpoint() {
      if (url.endsWith('/user/authenticate') && method == 'POST') {
        return post_user_authenticate();
      } else if (url.endsWith('/me/profile') && method == 'GET') {
        return get_me_profile();
      } else {
        return next.handle(request);
      }
    }

    function post_user_authenticate() {
      const { username, password } = body;
      const user = db.users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        ...user,
        token: 'fake-jwt-token'
      })
    }

    function get_me_profile() {
      if (!isLoggedIn()) return unauthorized();
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let mockHttpProviderService = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockHttpProviderService,
  multi: true
};
