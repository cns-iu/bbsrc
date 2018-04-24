import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BoundField } from '@ngx-dino/core';
import { Filter, SubdisciplineWeight } from 'bbsrc-database';

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
  @Input() filter: Partial<Filter> = {showMultidisciplinary: true, showUnmapped: true};
  @Input() nodeSizeRange = [2, 18];
  @Output() nodeClicked = new EventEmitter<any>();
  filteredSubdisciplines: SubdisciplineWeight[];
  @Output() filterUpdateComplete = new EventEmitter<boolean>();

  subdisciplineSize: BoundField<string>;
  subdisciplineID: BoundField<number|string>;

  constructor(private dataService: ScienceMapDataService) { }

  ngOnInit() {
    this.filteredSubdisciplines = [];

    this.dataService.filteredSubdisciplines.subscribe((subdisciplines) => {
      this.filteredSubdisciplines = subdisciplines;
    });

    // not user facing
    this.subdisciplineSize = this.dataService.subdisciplineSize;
    this.subdisciplineID = this.dataService.subdisciplineID;
  }

  ngOnChanges(changes: SimpleChanges) {
      if ('filter' in changes && this.filter) {
        this.dataService.fetchData(this.filter).subscribe(
          undefined, undefined, () => this.filterUpdateComplete.emit(true)
        );
      }
  }
}
