import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SzkolenieangularSharedModule } from 'app/shared';
import {
  RoomComponent,
  RoomDetailComponent,
  RoomUpdateComponent,
  RoomDeletePopupComponent,
  RoomDeleteDialogComponent,
  roomRoute,
  roomPopupRoute
} from './';

const ENTITY_STATES = [...roomRoute, ...roomPopupRoute];

@NgModule({
  imports: [SzkolenieangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RoomComponent, RoomDetailComponent, RoomUpdateComponent, RoomDeleteDialogComponent, RoomDeletePopupComponent],
  entryComponents: [RoomComponent, RoomUpdateComponent, RoomDeleteDialogComponent, RoomDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SzkolenieangularRoomModule {}
