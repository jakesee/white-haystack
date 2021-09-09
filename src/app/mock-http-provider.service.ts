import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import database from '../assets/database.json';

@Injectable({
  providedIn: 'root'
})
export class MockHttpProviderService implements HttpInterceptor {

  constructor(private _httpClient: HttpClient) { }

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
      } else if (url.endsWith('/providers') && method == 'GET') {
        return get_providers();
      } else if (url.endsWith('/provider') && method == 'GET') {
        return get_provider();
      } else {
        return next.handle(request);
      }
    }

    function get_providers() {
      return ok({
        data: database.providers
      });
    }

    function get_provider() {
      let providerId = request.params.get('id');
      let provider = database.providers[providerId]

      return ok({
        data: provider
      });
    }

    function post_user_authenticate() {
      const { username, password } = body;
      const user = database.users.find(x => x.username === username && x.password === password);
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
