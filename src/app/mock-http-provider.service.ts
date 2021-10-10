import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockHttpProviderService implements HttpInterceptor {

  constructor(private _httpClient: HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;
    var database = JSON.parse(localStorage.getItem('database'));

    console.log('MockHttpProviderService:intercept ' + url);

    return of(null)
      .pipe(mergeMap(handleEndpoint))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleEndpoint() {
      if (url.endsWith('/user/authenticate') && method == 'POST') {
        return post_user_authenticate();
      } else if (url.endsWith('/user/register') && method == 'POST') {
        return post_user_register();
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

      let response = { data: { ...user, token: 'fake-jwt-token' } };
      response = _fixAppointmentDateTime(response);

      return ok(response)
    }

    function post_user_register() {
      const { username, password } = body;

      const newUser = {
        "id": database.users.length,
        "username": username,
        "password": password,
        "firstName": 'Guest',
        "lastName": Date.now(),
        "episodes": []
      };

      database.users.push(newUser);

      updateDatabase(database);

      return post_user_authenticate();
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

    // manipulate data for testing

    function _fixAppointmentDateTime(response: any): any {

      for (var i = 0, day = -3; i < response.data.episodes?.length; i++, day++) {
        response.data.episodes[i].startAt = Date.now() + (1000 * 60 * 60 * 24 * day);
        // 15 minutes, but can be any duration
        response.data.episodes[i].endAt = response.data.episodes[i].startAt + (1000 * 60 * 15);
      }
      return response;
    }

    function updateDatabase(database: any) {
      localStorage.setItem("database", JSON.stringify(database));
    }

  }
}

export let mockHttpProviderService = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockHttpProviderService,
  multi: true
};
