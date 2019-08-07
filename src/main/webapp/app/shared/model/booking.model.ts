import { IRoom } from 'app/shared/model/room.model';

export interface IBooking {
  id?: number;
  user?: string;
  startDate?: string;
  endDate?: string;
  rooms?: IRoom[];
}

export class Booking implements IBooking {
  constructor(public id?: number, public user?: string, public startDate?: string, public endDate?: string, public rooms?: IRoom[]) {}
}
