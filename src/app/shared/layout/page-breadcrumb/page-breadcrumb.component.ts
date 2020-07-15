import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRouterState } from 'src/app/store/router';
import { Router, ActivatedRoute } from '@angular/router';
import { selectSubBreadcrumbTitle } from 'src/app/store/navigation';

@Component({
  selector: 'smart-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageBreadcrumbComponent {
  date = Date.now();
  vm$ = this.store.select(getRouterState);
  subBreadcrumb$ = this.store.select(selectSubBreadcrumbTitle);

  constructor(private store: Store<any>, private router: Router) {}

  navigate(breadCrumb: string, route) {
    const split = route.split('/');
    const crumb = breadCrumb.toLowerCase();
    if (crumb == split[1] && crumb !== 'settings') {
      this.router.navigate([split[1]]);
    }
  }
  getCrumbTitle(crumb) {
    return crumb;
  }
}
