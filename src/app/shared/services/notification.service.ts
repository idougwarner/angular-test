import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export interface Notification {
  notifications: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notification: Subject<Notification>;
  notificationURL = '/notification-service/user-notification/overview';

  constructor(wsService: WebsocketService, private http: HttpClient) {}

  getNotifications() {
    return this.http.get(environment.API_URL + this.notificationURL);
  }
}
