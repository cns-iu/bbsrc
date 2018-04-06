import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Filter, Publication } from 'bbsrc-database';
import { BBSRCDataService } from '../shared/bbsrc-data.service';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [BBSRCDataService]
})
export class HomeComponent implements OnInit, OnChanges {
  @ViewChild('drawer') drawer: any;
  @Output() filterToggled = new EventEmitter<any>();
  filter: Partial<Filter> = {};
  filteredPublications: Publication[];

  toggleOpen = true;
  narrowWidth = 1000;
  wideWidth = 1380;
  width = window.innerWidth;
  height = 730;

  constructor(private dataService: BBSRCDataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'filter' && this[propName]) {
        this.dataService.fetchData(this.filter);
      }
    }
    this.dataService.filteredPublications.subscribe((publications) => {
      this.filteredPublications = publications;
    });
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
