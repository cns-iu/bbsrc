export interface Publication {
  id: number;
  title: string;
  author: string;
  pmid: string;
  doi: string;
  pmcid: string;

  journalName: string;
  journalId: number;
  subdisciplines: {subd_id: number, weight: number}[];

  grantId: string;
  grantTitle: string;
  grantSummary: string;
  grantClasses: string[];
  grantYear: number;
  grantInstitution: string;
  grantMechanism: string;
}
