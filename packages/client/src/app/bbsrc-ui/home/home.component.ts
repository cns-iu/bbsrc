import { Component, ViewChild } from '@angular/core';

import { Filter } from 'bbsrc-database';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  filter: Partial<Filter> = {showMultidisciplinary: true, showUnmapped: true};
  filtersUpdating = false;
  openState = true;

  narrowWidth = window.innerWidth - 340;
  wideWidth = window.innerWidth;
  height = window.innerHeight - 110;
  containerHeight = window.innerHeight - 150;
  drawerWidth = window.innerWidth - window.innerWidth / 8;
  drawerHeight = window.innerHeight;

  scienceMapNodeSizeRange = [2, 18];

  constructor() { }
}
