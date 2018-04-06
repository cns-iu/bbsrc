import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/';
import { BBSRCFilterUIModule } from 'bbsrc-filter-ui';
import { VisualizationModule } from '../visualization';

import { DinoScienceMapLegendModule } from '@ngx-dino/science-map-legend';

import { HomeComponent } from './home/home.component';
import { ResultsPanelComponent } from './results-panel/results-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    VisualizationModule,
    BBSRCFilterUIModule,
    DinoScienceMapLegendModule
  ],
  exports: [
    HomeComponent,
    ResultsPanelComponent
  ],
  declarations: [HomeComponent, ResultsPanelComponent]
})
export class BbsrcUIModule { }
