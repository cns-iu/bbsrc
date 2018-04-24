import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BBSRCDatabaseService, Filter, SubdisciplineWeight } from 'bbsrc-database';
import { BoundField } from '@ngx-dino/core';

import { subdisciplineSizeField, subdisciplineIDField } from '../shared/science-map-fields';

@Injectable()
export class ScienceMapDataService {
  private dataSubscription: Subscription;
  filteredSubdisciplines = new BehaviorSubject<SubdisciplineWeight[]>([]);

  subdisciplineSize: BoundField<string>;
  subdisciplineID: BoundField<number|string>;

  constructor(private databaseService: BBSRCDatabaseService) {
    // not user facing
    this.subdisciplineSize = subdisciplineSizeField.getBoundField('size');
    this.subdisciplineID = subdisciplineIDField.getBoundField('id');
  }

  fetchData(filter: Partial<Filter> = {showMultidisciplinary: true, showUnmapped: true}) {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    const subdiscs = this.databaseService.getSubdisciplines(filter);
    this.dataSubscription = subdiscs.subscribe(
      (subdisciplines) => this.filteredSubdisciplines.next(subdisciplines)
    );

    return subdiscs;
  }
}
