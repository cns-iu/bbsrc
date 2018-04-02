import './rxjs-operators.ts';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlConnectionModule } from './graphql-connection.module';
import { BBSRCDatabaseService } from 'bbsrc-database';

@NgModule({
  imports: [
    CommonModule,
    GraphqlConnectionModule
  ],
  declarations: [],
  providers: [BBSRCDatabaseService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule, bbsrcDatabaseService: BBSRCDatabaseService) {
    console.log(bbsrcDatabaseService);
    
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
