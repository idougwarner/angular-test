import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoComponent } from './logo/logo.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageBreadcrumbComponent } from './page-breadcrumb/page-breadcrumb.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { DropdownAppsComponent } from './dropdown-apps/dropdown-apps.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { UiModule } from '../ui/ui.module';
import { NavigationModule } from '../navigation/navigation.module';
import { SettingsShortcutComponent } from './settings-shortcut/settings-shortcut.component';
import { ShortcutModalComponent } from './shortcut-modal/shortcut-modal.component';
import { FabShortcutComponent } from './fab-shortcut/fab-shortcut.component';
import { DropdownUserComponent } from './dropdown-user/dropdown-user.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserStatusService } from './dropdown-user/user-status.service';
import { CopyrightComponent } from './copyright/copyright.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    MainComponent,
    AuthComponent,
    SidebarComponent,
    LogoComponent,
    PageHeaderComponent,
    PageBreadcrumbComponent,
    PageHeadingComponent,
    PageFooterComponent,
    DropdownAppsComponent,
    SettingsComponent,
    SettingsModalComponent,
    SettingsShortcutComponent,
    ShortcutModalComponent,
    FabShortcutComponent,
    DropdownUserComponent,
    CopyrightComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BsDropdownModule,
    ModalModule,
    ButtonsModule,
    TabsModule.forRoot(),
    NavigationModule,
    UiModule
  ],
  exports: [MainComponent, AuthComponent, SidebarComponent, CopyrightComponent],
  entryComponents: [ShortcutModalComponent],
  providers: [UserStatusService]
})
export class LayoutModule {}
