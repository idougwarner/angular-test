import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';
import { LayoutModule } from './shared/layout/layout.module';
import { AuthGuard } from './shared/services/auth.guard';
import { LandingComponent } from './features/landing/landing.component';
import { LandingModule } from './features/landing/landing.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: LandingComponent, pathMatch: 'full' }],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/authentication/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes), LandingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
