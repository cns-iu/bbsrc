import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BBSRCFilterUIModule } from 'bbsrc-filter-ui';

import { CoreModule } from './core';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BBSRCFilterUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
