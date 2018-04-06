import { Component, ViewChild } from '@angular/core';

import { Filter } from 'bbsrc-database';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  filter: Partial<Filter> = {};

  narrowWidth = window.innerWidth - 380;
  wideWidth = window.innerWidth - 180;
  // height = window.innerHeight - 150;
  height = 730; // FIXME
  containerHeight = window.innerHeight - 150;

  constructor() { }
}
