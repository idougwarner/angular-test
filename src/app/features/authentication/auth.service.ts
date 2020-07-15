import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const ANGULAR_TEST_APP_SESSION_ID = 'angular-test-app-io-session-id';
const SESSION_DOMAIN = '';
const SESSION_PATH = '/';
@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    let store = localStorage.getItem(ANGULAR_TEST_APP_SESSION_ID);

    if (store) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(store));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(new User());
    }
  }

  userLogin(data) {
    console.log(data);
    return this.http.post(environment.API_URL + '/api/v1/login', data).pipe(
      map((user: any) => {
        if (user) {
          if (user.loggedIn) {
            let dateNow = new Date();
            dateNow.setTime(dateNow.getTime() + environment.SESSION_TIMEOUT * 60 * 1000);
            this.cookieService.set(
              ANGULAR_TEST_APP_SESSION_ID,
              user.platformSessionUUID,
              dateNow, // keep the cookie info of 1 hour.
              SESSION_PATH,
              SESSION_DOMAIN,
              environment.SESSION_SECURE // this needs to be set to true for live production,
            );
            localStorage.setItem(ANGULAR_TEST_APP_SESSION_ID, JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          } else {
            return user;
          }
        }
      })
    );
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.cookieService.get(ANGULAR_TEST_APP_SESSION_ID) ? true : false;
    // return (user && JSON.parse(user))? true: false;
  }
  get getSessionId() {
    return this.cookieService.get(ANGULAR_TEST_APP_SESSION_ID);
  }

  removeCookie() {
    this.cookieService.delete(ANGULAR_TEST_APP_SESSION_ID, SESSION_PATH, SESSION_DOMAIN, environment.SESSION_SECURE);
    localStorage.removeItem(ANGULAR_TEST_APP_SESSION_ID);
    this.currentUserSubject.next(null);
  }

  logout() {
    this.removeCookie();
    this.router.navigate(['/auth/login']);
  }
}
