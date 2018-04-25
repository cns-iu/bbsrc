import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { BoundField } from '@ngx-dino/core';

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
  subdisciplineSize: BoundField<string>;

  nodeSizeEncoding = '# Journal Publications in Subdiscipline';

  constructor(private dataService: ScienceMapDataService) { }

  ngOnInit() {
    this.subdisciplineSize = this.dataService.subdisciplineSize;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'filter' && this[propName]) {
        const filter = Object.assign({}, this.filter, {
          showMultidisciplinary: true, showUnmapped: true
        });
        this.dataService.fetchData(filter);
      }
    }
    this.dataService.filteredSubdisciplines.subscribe((subdisciplines) => {
      this.filteredSubdisciplines = subdisciplines;
    });
  }


}
