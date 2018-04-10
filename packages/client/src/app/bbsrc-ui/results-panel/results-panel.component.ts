import {
  Component, Input,
  OnInit,
  SimpleChanges, ViewEncapsulation, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FieldV2 as Field, BoundField, Operator } from '@ngx-dino/core';
import '@ngx-dino/core/src/operators/add/static/access';
import '@ngx-dino/core/src/operators/add/static/map';

import { BBSRCDatabaseService, Filter, Publication } from 'bbsrc-database';


function simpleField(fieldName: string, label: string): BoundField<any> {
  const op = Operator.access<any, string>(fieldName);
  const field = new Field({
    id: fieldName, label, initialOp: op, mapping: [
      ['default', Operator.map((content) => ({type: 'text', content}))]
    ]
  });

  return field.getBoundField('default');
}


@Component({
  selector: 'bbsrc-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ResultsPanelComponent implements OnInit {
  @Input() fields: BoundField<string>[] = [
    ['author', 'Author'], ['year', 'Year'], ['title', 'Title'],
    ['pmid', 'PubMed ID'], ['doi', 'DOI'], ['id', 'GTR ID'],
    ['journalName', 'Journal']
  ].map((s) => simpleField(s[0], s[1]));

  @Input() filter: Partial<Filter>;
  @Input() subd_id = 0;

  @ViewChild('panel') panel: any;

  publications: Observable<any[]> = Observable.of([]);

  description: string = undefined;

  constructor(private dataService: BBSRCDatabaseService) { }

  ngOnInit() { }

  public showSubdiscipline(data: any) {
    this.subd_id = data.subd_id;
    this.description = `${data.disc_name} – ${data.subd_name}`;

    const filter = Object.assign({}, this.filter, {
      subd_id: [data.subd_id], limit: 20
    });
    this.publications = this.dataService.getPublications(filter);
    this.panel.open();
  }
}
