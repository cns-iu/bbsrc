import {
  Component, Input, ViewChild,
  OnInit,
  OnChanges, SimpleChanges, ViewEncapsulation, EventEmitter
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
export class ResultsPanelComponent implements OnInit, OnChanges {
  @Input() filter: Partial<Filter>;
  @Input() subd_id = 0;

  @ViewChild('panel') panel: any;

  authorField: BoundField<string>;
  yearField: BoundField<number>;
  titleField: BoundField<string>;
  awardField: BoundField<any>;
  linkField: BoundField<any>;
  journalField: BoundField<string>;

  displayedColumns = ['author', 'year', 'title', 'award', 'link', 'journal'];

  description: string;
  dataSubscription: Subscription;
  numResults: number;
  dataSource = new MatTableDataSource();
  selectedNode: any;

  constructor(private dataService: BBSRCDatabaseService) {
    this.authorField = makeTextField('First Author', 'author');
    this.yearField = makeNumberField('Year', 'year');
    this.titleField = makeTextField('Title', 'title');
    this.awardField = makeLinkField('Award', '', '', 'grantId');
    this.linkField = makeLinkField('Links', 'pmid', 'doi', 'grantId');
    this.journalField = makeTextField('Journal', 'journalName');
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (('filter' in changes) && this.selectedNode) {
      this.showSubdiscipline(this.selectedNode, false);
    }
  }

  public showSubdiscipline(data: any, activatePanel = true): void {

    this.selectedNode = data;
    this.panel.disabled = false;

    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.subd_id = data.subd_id;
    this.description = `${data.disc_name} – ${data.subd_name}`;

    const extractor = Operator.combine({
      author: this.authorField.operator,
      year: this.yearField.operator,
      title: this.titleField.operator,
      link: this.linkField.operator,
      journal: this.journalField.operator
    });
    const filter = Object.assign({}, this.filter, {
      subd_id: [data.subd_id], limit: 50, sort: [{field: 'year', ascending: false}]
    });

    this.numResults = -1;
    this.dataSubscription = this.dataService.getPublicationResults(filter)
      .subscribe((response) => {
        const processedData = response.results.map((p) => extractor.get(p));
        this.numResults = response.pageInfo.totalCount;
        this.dataSource.data = processedData;
      });

    if (activatePanel) {
      this.panel.open();
    }
  }

  pubMedHref(pmid: string): string {
    return 'https://www.ncbi.nlm.nih.gov/pubmed/' + pmid;
  }

  doiHref(doi: string): string {
    return 'https://doi.org/' + doi;
  }

  gtrHref(gtr: string): string {
    return 'https://gtr.ukri.org/projects?ref=' + gtr.replace('/', '%2f');
  }

  bbsrcHref(gtr: string): string {
    return 'https://bbsrc.ukri.org/research/grants-search/AwardDetails/?FundingReference=' + gtr.replace('/', '%2f');
  }
}
