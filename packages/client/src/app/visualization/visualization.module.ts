import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinoScienceMapModule } from '@ngx-dino/science-map';
import { DinoScienceMapLegendModule } from '@ngx-dino/science-map-legend';

import { ScienceMapComponent } from './science-map/science-map.component';
import { SizeLegendComponent } from './size-legend/size-legend.component';

@NgModule({
  imports: [
    CommonModule,
    DinoScienceMapModule,
    DinoScienceMapLegendModule
  ],
  exports: [
    ScienceMapComponent,
    SizeLegendComponent
  ],
  declarations: [ScienceMapComponent, SizeLegendComponent]
})
export class VisualizationModule { }
