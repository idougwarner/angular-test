import { Component } from '@angular/core';
import { scrollToTop, toggleFullscreen } from '../../utils/utils.functions';
import { Store } from '@ngrx/store';
import { Go } from 'src/app/store/router';
import AuthService from 'src/app/features/authentication/auth.service';

@Component({
  selector: 'smart-fab-shortcut',
  templateUrl: './fab-shortcut.component.html'
})
export class FabShortcutComponent {

  constructor(
    private store: Store<any>,
    private authService: AuthService
  ) { }
  scrollTop($event: MouseEvent) {
    $event.preventDefault();
    scrollToTop(150);

  }
  logout($event: MouseEvent) {
    $event.preventDefault();
    this.authService.logout();

  }
  fullScreen($event: MouseEvent) {
    $event.preventDefault();
    toggleFullscreen();

  }
  printPage($event: MouseEvent) {
    $event.preventDefault();
    window.print();

  }

}
