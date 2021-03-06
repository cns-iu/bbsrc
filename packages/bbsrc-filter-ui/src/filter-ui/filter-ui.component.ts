import {
  Component, Output, ViewChild,
  OnInit, OnChanges,
  EventEmitter, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { assign, clone, debounce } from 'lodash';
import { NouisliderComponent } from 'ng2-nouislider';

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

  private filter: Partial<Filter> = {};
  nResults = 0;
  private resultSubscription: Subscription;

  textSearchControl = new FormControl();
  institutionControl = new FormControl();
  researchControl = new FormControl();
  mechanismControl = new FormControl();

  institutions: string[] = [];
  filteredInstitutions: Observable<string[]>;

  mechanisms: string[] = [
    'Fellowship',
    'Initiative',
    'Responsive Mode',
    'Small International',
    'Strategic Institute'
  ].sort();
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
  ].map((c) => {
    c.label = `${c.acronym} – ${c.label}`;
    return c;
  }).sort(({label: a}, {label: b}) => (a < b ? -1 : (b < a ? 1 : 0)));

  @ViewChild(NouisliderComponent) yearSlider: NouisliderComponent;
  yearSliderConfig: any = {
    start: [1998, 2016],
    margin: 0,
    padding: [0, 0],
    step: 1,
    range: {
      min: [1998],
      max: [2016]
    },
    connect: [false, true, false],
    tooltips: [true, true],
    format: {
      to: Number,
      from: Number
    }
  };


  @Output() filterChange = new EventEmitter<Partial<Filter>>();


  constructor(private service: BBSRCDatabaseService) {
    service.getDistinct('grantYear').map((years: string[]) => {
      const sortedYears = years.map(Number)
        .filter((year) => year !== 0)
        .sort((y1, y2) => y1 - y2);
      return [sortedYears[0], sortedYears[sortedYears.length - 1]];
    }).subscribe(([min, max]) => {
      const config = {start: [min, max], range: {min, max}};

      Object.assign(this.yearSliderConfig, config);
      if (this.yearSlider && this.yearSlider.slider) {
        setTimeout(() => this.yearSlider.slider.updateOptions(config));
      }
    });
  }

  ngOnInit() {
    const institutions = this.service.getDistinct('grantInstitution')
      .map((insts) => insts.slice().sort())
      .do((insts) => (this.institutions = insts));

    this.filteredInstitutions = Observable.concat(
      institutions,
      this.institutionControl.valueChanges.map((inst) => {
        return this.filterOptions(inst, this.institutions);
      })
    );
  }


  get hasFilter(): boolean {
    return !Object.values(this.filter).every((v) => v === undefined);
  }


  clear(): void {
    this.textSearchControl.reset('');
    this.institutionControl.reset('');
    this.researchControl.reset('');
    this.mechanismControl.reset('');
    this.yearSlider.slider.set(this.yearSliderConfig.start);

    this.filter = {};
    if (this.resultSubscription) {
      this.resultSubscription.unsubscribe();
      this.resultSubscription = undefined;
    }

    this.filterChange.emit({});
  }


  onTextSearchChange = debounce(function (
    this: FilterUiComponent, text: string
  ): void {
    this.updateFilter({fulltext: text !== '' ? [text] : undefined});
  }, FilterUiComponent.typingWaitTime);

  onInstitutionChange = debounce(function (
    this: FilterUiComponent, inst: string
  ): void {
    if (inst === '' || this.institutions.includes(inst)) {
      this.updateFilter({institution: inst !== '' ? [inst] : undefined});
    }
  }, FilterUiComponent.typingWaitTime);

  onResearchClassChange({value}: {value: string | undefined}): void {
    this.updateFilter({researchClassification: value ? [value] : undefined});
  }

  onMechanismChange({value}: {value: string | undefined}): void {
    this.updateFilter({mechanism: value ? [value] : undefined});
  }

  onYearChange([start, end]) {
    this.updateFilter({sessionYear: {start, end}});
  }

  private filterOptions(value: string, options: string[]): string[] {
    value = value.toLowerCase();
    return options.filter((op) => op.toLowerCase().indexOf(value) !== -1);
  }

  private updateFilter(change: Partial<Filter>): void {
    assign(this.filter, change);
    this.updateNumResults();
    this.filterChange.emit(clone(this.filter));
  }

  private updateNumResults(): void {
    const filter = assign({}, this.filter, {limit: 1});
    if (this.resultSubscription) {
      this.resultSubscription.unsubscribe();
    }
    this.resultSubscription = this.service.getPublicationResults(filter)
      .subscribe((result) => (this.nResults = result.pageInfo.totalCount));
  }
}
