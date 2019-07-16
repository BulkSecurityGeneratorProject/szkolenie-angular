import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SzkolenieangularSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SzkolenieangularSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [SzkolenieangularSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SzkolenieangularSharedModule {
  static forRoot() {
    return {
      ngModule: SzkolenieangularSharedModule
    };
  }
}
