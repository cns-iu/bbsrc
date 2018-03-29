export const TypesSchema = `
type SubdisciplineWeight {
  subd_id: ID!
  weight: Float
}

type Persona {
  id: ID!
  title: String
  author: String
  pmid: String
  doi: String
  pmcid: String

  journalName: String
  journalId: Integer
  subdisciplines: [SubdisciplineWeight];

  grantId: String
  grantTitle: String
  grantSummary: String
  grantClasses: [String!]
  grantYear: Integer
  grantInstitution: String
  grantMechanism: String

  name: String
  icon: String
  color: String
  gender: GENDER
  age_group: String
  handedness: HANDEDNESS
  zipcode: String
  state: String
  latitude: Float
  longitude: Float
}

input Filter {
  limit: Integer
  subd_id: Integer

  fulltext: String
  researchClassification: String
  sessionYear: String
  institution: String
  mechanism: String
  journalName: String
}

`;
