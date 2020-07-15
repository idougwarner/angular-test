import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent implements OnInit {
  copyrightYear: number;

  constructor() { }

  ngOnInit() {
    this.copyrightYear = new Date().getFullYear();
  }

}
