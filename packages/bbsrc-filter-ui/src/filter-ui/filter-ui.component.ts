import {
  Component, Output,
  OnInit, OnChanges,
  EventEmitter, SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

import { assign, clone, debounce } from 'lodash';

import { Filter } from 'bbsrc-database';


@Component({
  selector: 'bbsrc-filter-ui',
  templateUrl: './filter-ui.component.html',
  styleUrls: ['./filter-ui.component.sass']
})
export class FilterUiComponent implements OnInit {
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
  institutions: string[] = ['abc', 'def'];
  mechanisms: string[] = [];

  institutionControl = new FormControl();
  filteredInstitutions: Observable<string[]>;

  @Output() filterChange = new EventEmitter<Filter>();


  constructor() { }

  ngOnInit() {
    this.filteredInstitutions = this.institutionControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOptions(value, this.institutions))
    );
  }

  onTextSearchChange = debounce((text: string): void => {
    if (text !== '') {
      this.updateFilter({fulltext: [text]});
    }
  }, 400); // FIXME Adjust wait time

  onResearchClassChange({value}: {value: string | undefined}): void {
    if (value !== undefined) {
      this.updateFilter({researchClassification: [value]});
    }
  }

  onMechanismChange({value}: {value: string | undefined}): void {
    if (value !== undefined) {
      this.updateFilter({mechanism: [value]});
    }
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
