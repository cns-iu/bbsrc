import { TypesSchema } from './types.graphql';

export const schemaDef = `
scalar Date

${TypesSchema}

type PageInfo {
  totalCount: Int
}

type PublicationQuery {
  results: [Publication!]
  pageInfo: PageInfo
}

type SubdisciplineQuery {
  results: [SubdisciplineWeight!]
  pageInfo: PageInfo
}

type GetDistinctQuery {
  results: [String]
  pageInfo: PageInfo
}

type Query {
  getPublications(filter: Filter): PublicationQuery
  getSubdisciplines(filter: Filter): SubdisciplineQuery
  getDistinct(fieldName: String, filter: Filter): GetDistinctQuery
}

schema {
  query: Query
}
`;
