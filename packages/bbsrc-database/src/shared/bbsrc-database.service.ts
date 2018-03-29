import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';

import { Apollo } from 'apollo-angular';

import { Filter } from '../shared/filter';
import { Publication } from '../shared/publication';
import { SubdisciplineWeight } from '../shared/subdiscipline-weight';

export const GET_PUBLICATIONS = gql`
  query (
    $filter: Filter!
  ) {
    getPublications(filter: $filter);
  }
`;

export const GET_SUBDISCIPLINES = gql`
  query (
    $filter: Filter!
  ) {
    getSubdisciplines(filter: $filter);
  }
`;

@Injectable()
export class BBSRCDatabaseService {
  constructor(private apollo: Apollo) {}

  getPublications(filter: Filter): Observable<Publication[]> {
    return this.apollo.query<Publication[]>({
      query: GET_PUBLICATIONS,
      variables: { filter }
    }).map((result) => result.data);
  }

  getSubdisciplines(filter: Filter): Observable<SubdisciplineWeight[]> {
    return this.apollo.query<SubdisciplineWeight[]>({
      query: GET_SUBDISCIPLINES,
      variables: { filter }
    }).map((result) => result.data);
  }
}
