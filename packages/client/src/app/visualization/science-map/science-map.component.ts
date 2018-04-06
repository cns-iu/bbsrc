import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BoundField } from '@ngx-dino/core';
import { Filter, SubdisciplineWeight } from 'bbsrc-database';

import { subdisciplineSizeField, subdisciplineIDField } from '../shared/science-map-fields';
import { ScienceMapDataService } from '../shared/science-map-data.service';

@Component({
  selector: 'bbsrc-science-map',
  templateUrl: './science-map.component.html',
  styleUrls: ['./science-map.component.sass'],
  providers: [ ScienceMapDataService ]
})
export class ScienceMapComponent implements OnInit, OnChanges {
  @Input() width: number;
  @Input() height: number;
  @Input() filter: Partial<Filter> = {};
  filteredData: SubdisciplineWeight[];

  subdisciplineSize: BoundField<string>;
  subdisciplineID: BoundField<number|string>;

  constructor(private dataService: ScienceMapDataService) { }

  ngOnInit() {
    // not user facing
    this.subdisciplineSize = subdisciplineSizeField.getBoundField('size');
    this.subdisciplineID = subdisciplineIDField.getBoundField('id');
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'filter' && this[propName]) {
        this.dataService.fetchData(this.filter);
      }
    }
    this.dataService.filteredSubdisciplines.subscribe((subdisciplines) => {
      this.filteredData = subdisciplines;
    });
  }
}
