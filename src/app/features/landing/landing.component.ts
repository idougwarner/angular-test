import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthService from '../authentication/auth.service';

@Component({
  selector: 'smart-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  jsonData;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.jsonData = this.authService.currentUserValue;
  }
}
