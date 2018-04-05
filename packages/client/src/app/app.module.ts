import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { BbsrcUIModule } from './bbsrc-ui/'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BbsrcUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
