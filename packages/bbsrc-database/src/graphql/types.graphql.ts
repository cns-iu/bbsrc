export const TypesSchema = `
type SubdisciplineWeight {
  subd_id: ID!
  weight: Float
}

type Publication {
  id: ID!
  title: String
  author: String
  pmid: String
  doi: String
  pmcid: String

  journalName: String
  journalId: Int
  subdisciplines: [SubdisciplineWeight]

  grantId: String
  grantTitle: String
  grantSummary: String
  grantClasses: [String!]
  grantYear: Int
  grantInstitution: String
  grantMechanism: String
}

input Filter {
  limit: Int
  subd_id: Int

  fulltext: String
  researchClassification: String
  sessionYear: String
  institution: String
  mechanism: String
  journalName: String
}

`;
