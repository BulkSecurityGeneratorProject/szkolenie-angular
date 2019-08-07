import { IHotel } from 'app/shared/model/hotel.model';
import { IBooking } from 'app/shared/model/booking.model';

export interface IRoom {
  id?: number;
  number?: number;
  capacity?: number;
  price?: number;
  hotel?: IHotel;
  bookings?: IBooking[];
}

export class Room implements IRoom {
  constructor(
    public id?: number,
    public number?: number,
    public capacity?: number,
    public price?: number,
    public hotel?: IHotel,
    public bookings?: IBooking[]
  ) {}
}
