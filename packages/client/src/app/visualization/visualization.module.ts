import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScienceMapComponent } from './science-map/science-map.component';
import { DinoScienceMapModule } from '@ngx-dino/science-map';

@NgModule({
  imports: [
    CommonModule,
    DinoScienceMapModule
  ],
  exports: [
    ScienceMapComponent
  ],
  declarations: [ScienceMapComponent]
})
export class VisualizationModule { }
