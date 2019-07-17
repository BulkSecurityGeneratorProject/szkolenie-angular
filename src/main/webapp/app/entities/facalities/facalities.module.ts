import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SzkolenieangularSharedModule } from 'app/shared';
import {
  FacalitiesComponent,
  FacalitiesDetailComponent,
  FacalitiesUpdateComponent,
  FacalitiesDeletePopupComponent,
  FacalitiesDeleteDialogComponent,
  facalitiesRoute,
  facalitiesPopupRoute
} from './';

const ENTITY_STATES = [...facalitiesRoute, ...facalitiesPopupRoute];

@NgModule({
  imports: [SzkolenieangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FacalitiesComponent,
    FacalitiesDetailComponent,
    FacalitiesUpdateComponent,
    FacalitiesDeleteDialogComponent,
    FacalitiesDeletePopupComponent
  ],
  entryComponents: [FacalitiesComponent, FacalitiesUpdateComponent, FacalitiesDeleteDialogComponent, FacalitiesDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SzkolenieangularFacalitiesModule {}
