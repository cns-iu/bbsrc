export interface Filter {
  limit?: number;
  subd_id?: number;

  fulltext?: string;
  researchClassification?: string;
  sessionYear?: string;
  institution?: string;
  mechanism?: string;
  journalName: string;
}
