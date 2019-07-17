import { IRoom } from 'app/shared/model/room.model';

export interface IPrice {
  id?: number;
  amount?: number;
  date?: string;
  room?: IRoom;
}

export class Price implements IPrice {
  constructor(public id?: number, public amount?: number, public date?: string, public room?: IRoom) {}
}
