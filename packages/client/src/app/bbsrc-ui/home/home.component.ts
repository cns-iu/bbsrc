import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

import { Filter } from 'bbsrc-database';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  @Output() filterToggled = new EventEmitter<any>();

  filter: Partial<Filter> = {};

  toggleOpen = true;
  narrowWidth = 1000;
  wideWidth = 1380;
  width = window.innerWidth;
  height = 730;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.toggleOpen = !this.toggleOpen;
    this.width = this.toggleOpen ? this.narrowWidth : this.wideWidth;
    this.filterToggled.emit(this.toggleOpen);
    this.drawer.toggle();
  }

  log(data) {
    console.log(data);
  }
}
