import { TypesSchema } from './types.graphql';

export const schemaDef = `
scalar Date

${TypesSchema}

type Query {
  getPublications(filter: Filter): [Publication!]
  getSubdisciplines(filter: Filter): [SubdisciplineWeight!]
}

schema {
  query: Query
}
`;
