import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  title = 'smartadmin-angular-seed';

  ngOnInit() {
    // document.cookie.addEventListener('change', changed)
  }
  ngDestroy() {}
  changed($event) {
    console.log($event);
  }
}
