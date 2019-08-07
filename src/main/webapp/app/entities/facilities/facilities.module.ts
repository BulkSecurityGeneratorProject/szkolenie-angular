import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SzkolenieangularSharedModule } from 'app/shared';
import {
  FacilitiesComponent,
  FacilitiesDetailComponent,
  FacilitiesUpdateComponent,
  FacilitiesDeletePopupComponent,
  FacilitiesDeleteDialogComponent,
  facilitiesRoute,
  facilitiesPopupRoute
} from './';

const ENTITY_STATES = [...facilitiesRoute, ...facilitiesPopupRoute];

@NgModule({
  imports: [SzkolenieangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FacilitiesComponent,
    FacilitiesDetailComponent,
    FacilitiesUpdateComponent,
    FacilitiesDeleteDialogComponent,
    FacilitiesDeletePopupComponent
  ],
  entryComponents: [FacilitiesComponent, FacilitiesUpdateComponent, FacilitiesDeleteDialogComponent, FacilitiesDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SzkolenieangularFacilitiesModule {}
