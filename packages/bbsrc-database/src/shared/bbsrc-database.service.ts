import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import gql from 'graphql-tag';

import { Apollo } from 'apollo-angular';

import { Filter } from '../shared/filter';
import { Publication } from '../shared/publication';
import { SubdisciplineWeight } from '../shared/subdiscipline-weight';
import { QueryResults } from '../shared/query-results';

export const GET_PUBLICATIONS = gql`
  query (
    $filter: Filter!
  ) {
    getPublications(filter: $filter) {
      results {
        id
        author
        year
        title
        pmid
        doi
        pmcid
        journalName
      }
      pageInfo {
        totalCount
      }
    }
  }
`;

export const GET_SUBDISCIPLINES = gql`
  query (
    $filter: Filter!
  ) {
    getSubdisciplines(filter: $filter) {
      results {
        subd_id
        weight
      }
    }
  }
`;

export const GET_DISTINCT = gql`
  query (
    $fieldName: String!,
    $filter: Filter!
  ) {
    getDistinct(fieldName: $fieldName, filter: $filter) {
      results
    }
  }
`;

@Injectable()
export class BBSRCDatabaseService {
  constructor(private apollo: Apollo) { }

  getPublicationResults(filter: Partial<Filter> = {}): Observable<QueryResults<Publication>> {
    return this.apollo.query<Publication[]>({
      query: GET_PUBLICATIONS,
      variables: { filter }
    }).map((result) => result.data['getPublications']);
  }

  getPublications(filter: Partial<Filter> = {}): Observable<Publication[]> {
    return this.getPublicationResults(filter).map(r => r.results);
  }

  getSubdisciplines(filter: Partial<Filter> = {}): Observable<SubdisciplineWeight[]> {
    return this.apollo.query<SubdisciplineWeight[]>({
      query: GET_SUBDISCIPLINES,
      variables: { filter }
    }).map((result) => result.data['getSubdisciplines']['results']);
  }

  getDistinct(fieldName: string, filter: Partial<Filter> = {}): Observable<string[]> {
    return this.apollo.query<string[]>({
      query: GET_DISTINCT,
      variables: { fieldName, filter }
    }).map((result) => result.data['getDistinct']['results']);
  }
}
