/** Simulate server replying to file upload request */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import AuthService, { ANGULAR_TEST_APP_SESSION_ID } from 'src/app/features/authentication/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone({});
    if (this.authService.isLoggedIn) {
      request = request.clone({
        headers: request.headers.set(ANGULAR_TEST_APP_SESSION_ID, this.authService.getSessionId)
      });
    }
    return next.handle(request).pipe(
      retry(1),
      catchError((resp: any) => {
        if (resp.status === 404) {
          this.router.navigate(['/page-error-404']);
          this.toastr.error(resp.error.message, 'Error');
        } else if (resp.status === 401) {
          this.authService.logout();
          this.toastr.warning(resp.error.message, 'Warning');
        } else if (resp.status === 500) {
          this.router.navigate(['/page-error']);
          this.toastr.error(resp.error.message, 'Error');
        } else if (resp.status === 400) {
          this.toastr.error(resp.error.fieldErrors[0].message, 'Error');
          return throwError(resp.error.fieldErrors[0].message);
        }
        return throwError(resp.error.message);
      })
    );
  }
}
