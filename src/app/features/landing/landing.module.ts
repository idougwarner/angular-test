import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, RouterModule, NgxJsonViewerModule],
  exports: [LandingComponent]
})
export class LandingModule {}
