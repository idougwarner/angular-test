import { NgModule } from '@angular/core';
// import { NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';

// import { SharedModule } from './../theme/shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/shared/layout/layout.module';

@NgModule({
  declarations: [AuthComponent, AuthLoginComponent],
  imports: [SharedModule, LayoutModule, AuthRoutingModule],
  providers: [],
  bootstrap: [AuthComponent]
})
export class AuthModule {}
