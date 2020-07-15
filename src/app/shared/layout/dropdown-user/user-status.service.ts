import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import AuthService from 'src/app/features/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  userStatus = "/ui-activity-service/ui-activity/user";
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  setUserStatus(status) {
    if(this.authService.isLoggedIn) {
      this.http.post(environment.API_URL + this.userStatus, { activity: status }).subscribe(rtVal => {
      });
    }
  }
}
