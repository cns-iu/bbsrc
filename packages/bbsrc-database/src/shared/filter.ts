export interface Filter {
  limit: number;
  sort: {field: string, ascending?: boolean}[];
  subd_id: number[];

  fulltext: string[];
  researchClassification: string[];
  sessionYear: {start: number, end: number};
  institution: string[];
  mechanism: string[];
  journalName: string[];
}
