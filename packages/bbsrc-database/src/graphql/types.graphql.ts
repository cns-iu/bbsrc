export const TypesSchema = `
type SubdisciplineWeight {
  subd_id: ID!
  weight: Float
}

type Publication {
  id: ID!
  title: String
  author: String
  year: Int
  pmid: String
  doi: String
  pmcid: String

  journalName: String
  journalId: Int
  subdisciplines: [SubdisciplineWeight]

  grantId: String
  grantTitle: String
  grantClasses: [String!]
  grantYear: Int
  grantInstitution: String
  grantMechanism: String
  fulltext: String
}

input YearRange {
  start: Int!
  end: Int!
}

input Sort {
  field: String!
  ascending: Boolean
}

input Filter {
  limit: Int
  subd_id: [Int!]
  showMultidisciplinary: Boolean
  showUnmapped: Boolean
  sort: [Sort!]
  year: YearRange

  fulltext: [String!]
  researchClassification: [String!]
  sessionYear: YearRange
  institution: [String!]
  mechanism: [String!]
  journalName: [String!]
}
`;
