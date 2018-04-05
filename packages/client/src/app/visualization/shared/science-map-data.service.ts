import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BBSRCDatabaseService, Filter, SubdisciplineWeight } from 'bbsrc-database';

@Injectable()
export class ScienceMapDataService {
  private dataSubscription: Subscription;
  filteredSubdisciplines = new BehaviorSubject<SubdisciplineWeight[]>([]);

  constructor(private databaseService: BBSRCDatabaseService) { }

  fetchData(filter: Partial<Filter> = {}) {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.dataSubscription = this.databaseService.getSubdisciplines(filter).subscribe(
      (subdisciplines) => this.filteredSubdisciplines.next(subdisciplines));
  }
}
