import { IRoom } from 'app/shared/model/room.model';

export interface IBooking {
  id?: number;
  startDate?: string;
  endDate?: string;
  rooms?: IRoom[];
}

export class Booking implements IBooking {
  constructor(public id?: number, public startDate?: string, public endDate?: string, public rooms?: IRoom[]) {}
}
