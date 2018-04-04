import {
  Component, Output,
  OnInit, OnChanges,
  EventEmitter, SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { assign, clone, debounce } from 'lodash';

import { Filter, BBSRCDatabaseService } from 'bbsrc-database';


@Component({
  selector: 'bbsrc-filter-ui',
  templateUrl: './filter-ui.component.html',
  styleUrls: ['./filter-ui.component.sass']
})
export class FilterUiComponent implements OnInit {
  static typingWaitTime = 400;

  private filter: Filter = {
    limit: 0,
    subd_id: [],

    fulltext: [],
    researchClassification: [],
    sessionYear: {start: -1, end: -1},
    institution: [],
    mechanism: [],
    journalName: []
  };

  researchClasses: string[] = [];
  institutions: string[] = [];
  mechanisms: string[] = [];

  institutionControl = new FormControl();
  filteredInstitutions: Observable<string[]>;

  @Output() filterChange = new EventEmitter<Filter>();


  constructor(private service: BBSRCDatabaseService) {
    this.filteredInstitutions = service.getDistinct('grantInstitution')
      .map((insts) => insts.slice().sort())
      .do((insts) => (this.institutions = insts));

    service.getDistinct('grantMechanism').map((mecs) => mecs.slice().sort())
      .subscribe((mecs) => (this.mechanisms = mecs));
  }

  ngOnInit() {
    this.filteredInstitutions = Observable.concat(
      this.filteredInstitutions,
      this.institutionControl.valueChanges.map((inst) => {
        return this.filterOptions(inst, this.institutions);
      })
    );
  }

  onTextSearchChange = debounce(function (
    this: FilterUiComponent, text: string
  ): void {
    this.updateFilter({fulltext: text !== '' ? [text] : []});
  }, FilterUiComponent.typingWaitTime);

  onResearchClassChange({value}: {value: string | undefined}): void {
    this.updateFilter({researchClassification: value ? [value] : []});
  }

  onInstitutionChange = debounce(function (
    this: FilterUiComponent, inst: string
  ): void {
    if (inst === '' || this.institutions.includes(inst)) {
      this.updateFilter({institution: inst !== '' ? [inst] : []});
    }
  }, FilterUiComponent.typingWaitTime);

  onMechanismChange({value}: {value: string | undefined}): void {
    this.updateFilter({mechanism: value ? [value] : []});
  }

  private filterOptions(value: string, options: string[]): string[] {
    value = value.toLowerCase();
    return options.filter((op) => op.toLowerCase().indexOf(value) === 0);
  }

  private updateFilter(change: Partial<Filter>): void {
    assign(this.filter, change);
    this.filterChange.emit(clone(this.filter));
  }
}
