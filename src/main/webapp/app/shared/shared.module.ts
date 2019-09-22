import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VeilletestSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [VeilletestSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [VeilletestSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VeilletestSharedModule {
  static forRoot() {
    return {
      ngModule: VeilletestSharedModule
    };
  }
}
