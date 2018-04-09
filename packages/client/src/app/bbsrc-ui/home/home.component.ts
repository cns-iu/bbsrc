import { Component, ViewChild } from '@angular/core';

import { Filter } from 'bbsrc-database';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  filter: Partial<Filter> = {};

  narrowWidth = window.innerWidth - 340;
  wideWidth = window.innerWidth - 180;
  height = window.innerHeight - 110;
  containerHeight = window.innerHeight - 150;
  drawerWidth = window.innerWidth - window.innerWidth / 8;
  drawerHeight = window.innerHeight;
}
