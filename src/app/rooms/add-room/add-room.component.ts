import { Component } from '@angular/core';
import { RoomList } from '../rooms.interface';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {

  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0
  };

  successMessage : string = '';

  constructor(private roomService: RoomsService) {

  }

  addRoom(addRoomForm: NgForm) :void {
    this.roomService.addRoom(this.room)
    .subscribe((data) => {
      this.successMessage='Room Added Successfully';
      addRoomForm.reset();
    })
  }

}
