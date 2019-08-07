import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'booking',
        loadChildren: () => import('./booking/booking.module').then(m => m.SzkolenieangularBookingModule)
      },
      {
        path: 'hotel',
        loadChildren: () => import('./hotel/hotel.module').then(m => m.SzkolenieangularHotelModule)
      },
      {
        path: 'room',
        loadChildren: () => import('./room/room.module').then(m => m.SzkolenieangularRoomModule)
      },
      {
        path: 'facilities',
        loadChildren: () => import('./facilities/facilities.module').then(m => m.SzkolenieangularFacilitiesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SzkolenieangularEntityModule {}
