import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Filter, SubdisciplineWeight } from 'bbsrc-database';
import { ScienceMapDataService } from '../shared/science-map-data.service';

@Component({
  selector: 'bbsrc-size-legend',
  templateUrl: './size-legend.component.html',
  styleUrls: ['./size-legend.component.sass'],
  providers: [ScienceMapDataService]
})
export class SizeLegendComponent implements OnInit, OnChanges {
  @Input() filter: Partial<Filter> = {};
  filteredSubdisciplines: SubdisciplineWeight[];

  constructor(private dataService: ScienceMapDataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'filter' && this[propName]) {
        this.dataService.fetchData(this.filter);
      }
    }
    this.dataService.filteredSubdisciplines.subscribe((subdisciplines) => {
      this.filteredSubdisciplines = subdisciplines;
    });
  }


}
