import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'booking',
        loadChildren: './booking/booking.module#SzkolenieangularBookingModule'
      },
      {
        path: 'hotel',
        loadChildren: './hotel/hotel.module#SzkolenieangularHotelModule'
      },
      {
        path: 'room',
        loadChildren: './room/room.module#SzkolenieangularRoomModule'
      },
      {
        path: 'price',
        loadChildren: './price/price.module#SzkolenieangularPriceModule'
      },
      {
        path: 'facalities',
        loadChildren: './facalities/facalities.module#SzkolenieangularFacalitiesModule'
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
