import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BBSRCDatabaseService, Filter, Publication } from 'bbsrc-database';

@Injectable()
export class BBSRCDataService {
  private dataSubscription: Subscription;
  filteredPublications = new BehaviorSubject<Publication[]>([]);

  constructor(private databaseService: BBSRCDatabaseService) { }

  fetchData(filter: Partial<Filter> = {}) {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.dataSubscription = this.databaseService.getPublications(filter).subscribe(
      (publications) => this.filteredPublications.next(publications));

    return this;
  }
}
