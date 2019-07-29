import { IPrice } from 'app/shared/model/price.model';
import { IHotel } from 'app/shared/model/hotel.model';
import { IBooking } from 'app/shared/model/booking.model';

export interface IRoom {
  id?: number;
  number?: number;
  capacity?: number;
  prices?: IPrice[];
  hotel?: IHotel;
  bookings?: IBooking[];
}

export class Room implements IRoom {
  constructor(
    public id?: number,
    public number?: number,
    public capacity?: number,
    public prices?: IPrice[],
    public hotel?: IHotel,
    public bookings?: IBooking[]
  ) {}
}
