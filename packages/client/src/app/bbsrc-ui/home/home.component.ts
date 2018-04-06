import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { Filter } from 'bbsrc-database';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  filter: Partial<Filter> = {};

  toggleOpen = true;
  narrowWidth = window.innerWidth - 380;
  wideWidth = window.innerWidth - 180;
  // height = window.innerHeight - 150;
  height = 730; // FIXME
  containerHeight = window.innerHeight - 150;

  constructor() { }

  ngOnInit() { }

  toggle() {
    this.toggleOpen = !this.toggleOpen;
    this.drawer.toggle();
  }
}
