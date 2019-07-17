import { IFacalities } from 'app/shared/model/facalities.model';
import { IRoom } from 'app/shared/model/room.model';

export interface IHotel {
  id?: number;
  name?: string;
  location?: string;
  facalities?: IFacalities[];
  rooms?: IRoom[];
}

export class Hotel implements IHotel {
  constructor(
    public id?: number,
    public name?: string,
    public location?: string,
    public facalities?: IFacalities[],
    public rooms?: IRoom[]
  ) {}
}
