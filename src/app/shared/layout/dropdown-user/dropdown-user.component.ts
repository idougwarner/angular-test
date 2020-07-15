import { Component, HostListener, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserStatusService } from './user-status.service';
import AuthService from 'src/app/features/authentication/auth.service';
import { toggleFullscreen } from '../../utils/utils.functions';

@Component({
  selector: 'smart-dropdown-user',
  templateUrl: './dropdown-user.component.html',
  styleUrls: ['./dropdown-user.component.scss']
})
export class DropdownUserComponent implements OnInit {
  user = {
    app: 'SmartAdmin',
    name: 'Dr. Codex Lantern',
    email: 'drlantern@gotbootstrap.com',
    avatar: 'avatar-admin.png'
  };
  currentUser;
  currentUserObservable;
  userImage;

  constructor(
    private cdr: ChangeDetectorRef,
    private userStatusService: UserStatusService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.userImage = reader.result;
        this.cdr.markForCheck();
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  userStatusTimerId;
  timeoutInMilisecons = 180 * 1000;
  userStatus = 'ONLINE';
  ngOnInit(): void {}
}
