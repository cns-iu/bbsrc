import {
  Component, Output,
  OnInit, OnChanges,
  EventEmitter, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { assign, clone, debounce } from 'lodash';

import { Filter, BBSRCDatabaseService } from 'bbsrc-database';


interface ResearchClass {
  label: string;
  acronym: string;
}


@Component({
  selector: 'bbsrc-filter-ui',
  templateUrl: './filter-ui.component.html',
  styleUrls: ['./filter-ui.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FilterUiComponent implements OnInit {
  static typingWaitTime = 400;

  private filter: Filter = {
    limit: 0,
    sort: [],
    subd_id: [],

    fulltext: [],
    researchClassification: [],
    year: {start: undefined, end: undefined},
    sessionYear: {start: undefined, end: undefined},
    institution: [],
    mechanism: [],
    journalName: []
  } as any;

  institutions: string[] = [];
  institutionControl = new FormControl();
  filteredInstitutions: Observable<string[]>;

  mechanisms: string[] = [];
  researchClasses: ResearchClass[] = [
    {label: 'Agricultural and Food Security', acronym: 'AFS'},
    {label: 'Ageing: LLHW', acronym: 'AGE'},
    {label: 'Animal Health', acronym: 'AH'},
    {label: 'Animal Welfare', acronym: 'AW'},
    {label: 'Bioscience for Health', acronym: 'BH'},
    {label: 'Crop Science', acronym: 'CS'},
    {label: 'Diet and Health', acronym: 'DH'},
    {label: 'Bioenergy', acronym: 'EG'},
    {label: 'Industrial Biotechnology', acronym: 'IB'},
    {label: 'Industrial Biotechnology and Bioenergy', acronym: 'IBBE'},
    {label: 'Immunology', acronym: 'IMM'},
    {label: 'Microbial Food Safety', acronym: 'MFS'},
    {label: 'Microbiology', acronym: 'MIC'},
    {label: 'Neuroscience and Behaviour', acronym: 'NS'},
    {label: 'New Ways of Working', acronym: 'NWW'},
    {label: 'Pharmaceuticals', acronym: 'PHM'},
    {label: 'Plant Science', acronym: 'PS'},
    {label: 'Regenerative Biology and Tissue Engineering', acronym: 'RE'},
    {label: 'The 3 Rs (Replacement, Reduction & Refinement of Animals in Research)', acronym: 'RRR'},
    {label: 'Systems Biology', acronym: 'SB'},
    {label: 'Stem Cells', acronym: 'SC'},
    {label: 'Soil Science', acronym: 'SS'},
    {label: 'Structural Biology', acronym: 'STR'},
    {label: 'Synthetic Biology', acronym: 'SYN'},
    {label: 'Technology Development', acronym: 'TD'},
    {label: 'World Class Underpinning Bioscience', acronym: 'WUB'}
  ].sort(({label: a}, {label: b}) => (a < b ? -1 : (b < a ? 1 : 0)));

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

  onInstitutionChange = debounce(function (
    this: FilterUiComponent, inst: string
  ): void {
    if (inst === '' || this.institutions.includes(inst)) {
      this.updateFilter({institution: inst !== '' ? [inst] : []});
    }
  }, FilterUiComponent.typingWaitTime);

  onResearchClassChange({value}: {value: string | undefined}): void {
    this.updateFilter({researchClassification: value ? [value] : []});
  }

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
