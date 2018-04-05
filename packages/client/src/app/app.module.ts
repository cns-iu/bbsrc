import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BbsrcUIModule } from './bbsrc-ui/';

import { CoreModule } from './core';
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
