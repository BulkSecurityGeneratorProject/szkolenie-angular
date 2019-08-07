import { IHotel } from 'app/shared/model/hotel.model';

export interface IFacilities {
  id?: number;
  type?: string;
  hotel?: IHotel;
}

export class Facilities implements IFacilities {
  constructor(public id?: number, public type?: string, public hotel?: IHotel) {}
}
