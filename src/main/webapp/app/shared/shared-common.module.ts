import { NgModule } from '@angular/core';

import { SzkolenieangularSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [SzkolenieangularSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [SzkolenieangularSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SzkolenieangularSharedCommonModule {}
