import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomGuard } from './guards/room.guard';

const routes: Routes = [
  {path: '', 
  component: RoomsComponent,
  canActivateChild: [RoomGuard],
  children: [
    {path: 'add', component: AddRoomComponent},
    // {path: ':id', component: RoomsBookingComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
