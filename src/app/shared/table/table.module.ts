import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableListingComponent } from './table-listing/table-listing.component';
import { PanelsModule } from '../panels/panels.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PaginationExComponent } from './pagination-ex/pagination-ex.component';
import { TimeagoModule } from 'ngx-timeago';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';

@NgModule({
  declarations: [TableListingComponent, PaginationExComponent, TableToolbarComponent],
  exports: [TableListingComponent, PaginationExComponent, TableToolbarComponent, TimeagoModule],
  imports: [
    CommonModule,
    PanelsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
    PaginationModule.forRoot(),
    TimeagoModule.forRoot(),
    FormsModule
  ]
})
export class TableModule {}
