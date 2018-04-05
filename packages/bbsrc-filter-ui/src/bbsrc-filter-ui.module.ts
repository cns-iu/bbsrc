import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';

import { NouisliderModule } from 'ng2-nouislider';

import { FilterUiComponent } from './filter-ui/filter-ui.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,

    BrowserModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,

    NouisliderModule
  ],
  exports: [
    FilterUiComponent
  ],
  declarations: [
    FilterUiComponent
  ],
  providers: []
})
export class BBSRCFilterUIModule { }
