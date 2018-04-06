import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { FieldV2 as Field, BoundField, Operator } from '@ngx-dino/core';
import '@ngx-dino/core/src/operators/add/static/access';

import { BBSRCDatabaseService, Filter, Publication } from 'bbsrc-database';

function simpleField(fieldName: string, label: string): BoundField<string> {
  return new BoundField<string>(
    new Field({id: fieldName, label}),
    Operator.access<any, string>(fieldName)
  );
}

@Component({
  selector: 'bbsrc-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.sass'],
  animations: [
    trigger('panelState', [
      state('inactive', style({
        display: 'none',
        bottom: '0px'
      })),
      state('active',   style({
        display: 'block',
        top: '284px'
      })),
      transition('inactive => active', animate('60ms ease-in')),
      transition('active => inactive', animate('60ms ease-out'))
    ]),
    trigger('buttonState', [
      state('inactive', style({
        bottom: '0px'
      })),
      state('active',   style({
        'top': '-448px'
      })),
      transition('inactive => active', animate('60ms ease-in')),
      transition('active => inactive', animate('60ms ease-out'))
    ])
  ]
})
export class ResultsPanelComponent implements OnInit, OnChanges {
  panelState = 'inactive';
  buttonState = 'inactive';

  @Input() fields: BoundField<string>[] = [
    ['author', 'Author'], ['year', 'year'], ['title', 'Title'],
    ['pmid', 'PubMed ID'], ['doi', 'DOI'], ['id', 'GTR ID'],
    ['journalName', 'Journal']
  ].map((s) => simpleField(s[0], s[1]));

  @Input() filter: Partial<Filter>;
  @Input() subd_id = 0;

  publications: Observable<any[]> = Observable.of([]);

  constructor(private dataService: BBSRCDatabaseService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

  }

  public showSubdiscipline(subd_id: any) {
    this.panelState = 'active';
    this.subd_id = subd_id;

    const filter = Object.assign({}, this.filter, {subd_id: [subd_id], limit: 20});
    this.publications = this.dataService.getPublications(filter);
  }

  togglePanel() {
    this.panelState = this.panelState === 'active' ? 'inactive' : 'active';
    this.buttonState = this.buttonState === 'active' ? 'inactive' : 'active';
  }
}
