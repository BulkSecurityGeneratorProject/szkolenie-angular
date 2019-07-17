import { IHotel } from 'app/shared/model/hotel.model';

export interface IFacalities {
  id?: number;
  type?: string;
  hotel?: IHotel;
}

export class Facalities implements IFacalities {
  constructor(public id?: number, public type?: string, public hotel?: IHotel) {}
}
