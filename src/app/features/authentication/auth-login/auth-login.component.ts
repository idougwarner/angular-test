import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import AuthService from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  isUserFormSubmitted = false;
  isSecurityFormSubmitted = false;
  loginModel: any = new Object();
  isSubmitting = false;

  loginRequestUUID = '';
  phone = '';
  emailErrorMsg = '';

  userForm: FormGroup = new FormGroup({
    email: new FormControl('testaccount+greg@livedatatechnologies.com', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private cdr: ChangeDetectorRef,
    public fvs: FormValidationService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  onUserFormSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    this.isSubmitting = true;

    this.authService
      .userLogin({
        email: this.userForm.value.email,
        password: this.userForm.value.password
      })
      .subscribe(
        (data: any) => {
          this.isSubmitting = false;
          if (data.loggedIn) {
            this.router.navigate(['/']);
            this.toastr.success('Successfully logged in.', 'Welcome!');
          } else {
            this.toastr.warning('Failed log in.', 'Warning');
          }
        },
        (error: any) => {
          this.isSubmitting = false;
          console.log(error);
          this.isUserFormSubmitted = false;
          this.cdr.markForCheck();
        }
      );
  }
}
