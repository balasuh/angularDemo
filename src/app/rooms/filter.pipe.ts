import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './rooms.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[], price: number | null): RoomList[] {
    if (price) {
      return rooms.filter((room) => room.price <= price);
    }
    return rooms;
  }

}
