import { IFacilities } from 'app/shared/model/facilities.model';
import { IRoom } from 'app/shared/model/room.model';

export interface IHotel {
  id?: number;
  name?: string;
  location?: string;
  facilities?: IFacilities[];
  rooms?: IRoom[];
}

export class Hotel implements IHotel {
  constructor(
    public id?: number,
    public name?: string,
    public location?: string,
    public facilities?: IFacilities[],
    public rooms?: IRoom[]
  ) {}
}
