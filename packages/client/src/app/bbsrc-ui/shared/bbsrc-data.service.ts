import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  BBSRCDatabaseService,
  Filter,
  Publication,
  SubdisciplineWeight
} from 'bbsrc-database';

@Injectable()
export class BBSRCDataService {
  private publicationSubscription: Subscription;
  private subdisciplineSubscription: Subscription;

  filteredPublications = new BehaviorSubject<Publication[]>([]);
  filteredSubdisciplines = new BehaviorSubject<SubdisciplineWeight[]>([]);

  constructor(private databaseService: BBSRCDatabaseService) { }

  fetchPublications(filter: Partial<Filter> = {}) {
    if (this.publicationSubscription) {
      this.publicationSubscription.unsubscribe();
    }

    this.publicationSubscription = this.databaseService.getPublications(filter).subscribe(
      (publications) => this.filteredPublications.next(publications));

    return this;
  }

  fetchSubdisciplines(filter: Partial<Filter> = {}) {
    if (this.subdisciplineSubscription) {
      this.subdisciplineSubscription.unsubscribe();
    }
    console.log('filter', filter);
    this.subdisciplineSubscription = this.databaseService.getSubdisciplines(filter).subscribe(
      (subdisciplines) => this.filteredSubdisciplines.next(subdisciplines));

    return this;
  }
}
