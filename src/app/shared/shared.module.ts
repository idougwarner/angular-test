import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { PanelsModule } from './panels/panels.module';
import { FilterPipe } from './pipes/filter.pipe';
import { TableModule } from './table/table.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { UtilsModule } from './utils/utils.module';
import { ChartsModule } from 'ng2-charts';
import { SelectModule } from 'ng-select';
import { FormValidationService } from './services/form-validation.service';
import { SelectOptionService } from './services/select-option.service';
import { TagInputModule } from 'ngx-chips';
import { WebsocketService } from './services/websocket.service';
import { NotificationService } from './services/notification.service';
import { PageErrorComponent } from './common-pages/page-error/page-error.component';
import { TechPageErrorComponent } from './common-pages/tech-page-error/tech-page-error.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { KeyMapPipe } from './pipes/keyMap.pipe';
import { KeyMapOnly2Pipe } from './pipes/keyMapOnly2.pipe';
import { TimeagoModule } from 'ngx-timeago';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [FilterPipe, KeyMapPipe, KeyMapOnly2Pipe, PageErrorComponent, TechPageErrorComponent],
  providers: [FormValidationService, SelectOptionService, WebsocketService, NotificationService],
  imports: [
    CommonModule,
    FormsModule,
    ArchwizardModule,
    AngularDualListBoxModule,
    NgxJsonViewerModule,
    PanelsModule,
    AlertModule,
    NgxDropzoneModule,
    TimeagoModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TableModule,
    ButtonsModule,
    RoundProgressModule,
    UtilsModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    SelectModule,
    TagInputModule,
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
    InfiniteScrollModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ArchwizardModule,
    AngularDualListBoxModule,
    NgxJsonViewerModule,
    PanelsModule,
    AlertModule,
    NgxDropzoneModule,
    CollapseModule,
    TabsModule,
    TimeagoModule,
    PopoverModule,
    FilterPipe,
    KeyMapPipe,
    KeyMapOnly2Pipe,
    TableModule,
    ButtonsModule,
    RoundProgressModule,
    UtilsModule,
    ChartsModule,
    BsDropdownModule,
    ReactiveFormsModule,
    SelectModule,
    TagInputModule,
    TypeaheadModule,
    PaginationModule,
    InfiniteScrollModule
  ],
  entryComponents: []
})
export class SharedModule {}
