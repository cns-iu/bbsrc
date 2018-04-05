import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/';
import { VisualizationModule } from '../visualization';
import { HomeComponent } from './home/home.component';
import { ResultsPanelComponent } from './results-panel/results-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    VisualizationModule
  ],
  exports: [
    HomeComponent,
    ResultsPanelComponent
  ],
  declarations: [HomeComponent, ResultsPanelComponent]
})
export class BbsrcUIModule { }
