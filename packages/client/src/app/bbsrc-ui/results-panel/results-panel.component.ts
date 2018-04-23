import {
  Component, Input, ViewChild,
  OnInit,
  SimpleChanges, ViewEncapsulation, EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FieldV2 as Field, BoundField, Operator } from '@ngx-dino/core';
import '@ngx-dino/core/src/operators/add/static/access';
import '@ngx-dino/core/src/operators/add/static/combine';
import '@ngx-dino/core/src/operators/add/static/map';

import { BBSRCDatabaseService, Filter, Publication } from 'bbsrc-database';


export interface LinkItem {
  content: string;
  href: string;
}

export type LinkFieldData = Record<'pmid' | 'doi' | 'gtr', LinkItem>;

function makeTextField(label: string, path: string): BoundField<string> {
  return new Field<string>({
    id: path, label: label, initialOp: Operator.access(path),
    mapping: {default: true}
  }).getBoundField('default');
}

function makeNumberField(label: string, path: string): BoundField<number> {
  return new Field(Object.assign({}, makeTextField(label, path).field, {
    mapping: {default: Operator.map(Number)}
  })).getBoundField('default');
}

function makeLinkField(
  label: string, pmidPath: string, doiPath: string, gtrPath: string
): BoundField<LinkFieldData> {
  return new Field({
    id: pmidPath + doiPath + gtrPath, label: label,
    initialOp: Operator.combine({
      pmid: Operator.access(pmidPath),
      doi: Operator.access(doiPath),
      gtr: Operator.access(gtrPath)
    }),
    mapping: {
      default: Operator.map((data) => {
        return data as LinkFieldData; // TODO lookup hrefs
      })
    }
  }).getBoundField('default');
}


@Component({
  selector: 'bbsrc-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ResultsPanelComponent implements OnInit {
  @Input() filter: Partial<Filter>;
  @Input() subd_id = 0;

  @ViewChild('panel') panel: any;

  authorField: BoundField<string>;
  yearField: BoundField<number>;
  titleField: BoundField<string>;
  linkField: BoundField<any>; // Fix type
  journalField: BoundField<string>;

  displayedColumns = ['author', 'year', 'title', 'link', 'journal'];

  description: string;
  dataSubscription: Subscription;
  processedData = new EventEmitter<any[][]>();
  numResults: Number;

  constructor(private dataService: BBSRCDatabaseService) {
    this.authorField = makeTextField('Author', 'author');
    this.yearField = makeNumberField('Year', 'year');
    this.titleField = makeTextField('Title', 'title');
    this.linkField = makeLinkField('Links', 'pmid', 'doi', 'grantId');
    this.journalField = makeTextField('Journal', 'journalName');
  }

  ngOnInit() { }

  public showSubdiscipline(data: any): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.subd_id = data.subd_id;
    this.description = `${data.disc_name} – ${data.subd_name}`;

    const getters = [
      this.authorField, this.yearField, this.titleField,
      this.linkField, this.journalField
    ].map((f) => f.operator.getter);
    const filter = Object.assign({}, this.filter, {
      subd_id: [data.subd_id], limit: 20, sort: [{field: 'year', ascending: false}]
    });

    this.numResults = -1;
    this.dataSubscription = this.dataService.getPublicationResults(filter)
      .subscribe((response) => {
        this.processedData.emit(response.results.map((p) => getters.map((g) => g(p))));
        this.numResults = response.pageInfo.totalCount;
      });

    this.panel.open();
  }

  pubMedHref(pmid: string): string {
    return 'https://www.ncbi.nlm.nih.gov/pubmed/' + pmid;
  }

  doiHref(doi: string): string {
    return 'https://doi.org/' + doi;
  }

  gtrHref(gtr: string): string {
    return 'https://bbsrc.ukri.org/research/grants-search/AwardDetails/?FundingReference=' + gtr.replace('/', '%2f');
  }
}
