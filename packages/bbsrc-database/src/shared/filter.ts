export interface Filter {
  limit: number;
  subd_id: number[];

  fulltext: string[];
  researchClassification: string[];
  sessionYear: {start: number, end: number};
  institution: string[];
  mechanism: string[];
  journalName: string[];
}
