import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appConfig.service';
import { AppConfig } from '../../AppConfig/appConfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
// import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  // headers = new HttpHeaders({ 'token': 'asdasdsa5d151515'});
  // getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
  // getRooms$ = this.http.get<RoomList[]>('/api/rooms')
  // .pipe(
  // getRooms$ = this.http.get<RoomList[]>('/api/rooms', {headers: this.headers}).pipe(
  //   shareReplay(1)
  // );

  constructor(@Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig,
  private http: HttpClient
  ) { 
    this.getRooms();
    console.log('Rooms Service Initialized...');
    // console.log(environment.apiEndpoint);
    console.log(this.appConfig.apiEndpoint);
 }

//  roomList: RoomList[] = [];

 getRooms() {
   return this.http.get<RoomList[]>('/api/rooms');
 }

  // roomList : RoomList[] = [
  //   {
  //     roomNumber: 1,
  //     roomType: 'Deluxe Room', 
  //     amenities: 'AirCon, Wifi, TV, Kitchen', 
  //     price: 500, 
  //     photos: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
  //     checkinTime: new Date('25-May-2023'), 
  //     checkoutTime: new Date('26-May-2023'),
  //     rating: 4.5
  //   },

  //   {
  //     roomNumber: 2,
  //     roomType: 'Normal Room', 
  //     amenities: 'Wifi, TV', 
  //     price: 250, 
  //     photos: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
  //     checkinTime: new Date('25-May-2023'), 
  //     checkoutTime: new Date('26-May-2023'),
  //     rating: 3.8,
  //   },

  //   {
  //     roomNumber: 3,
  //     roomType: 'Budget Room', 
  //     amenities: 'Wifi', 
  //     price: 149, 
  //     photos: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
  //     checkinTime: new Date('25-May-2023'), 
  //     checkoutTime: new Date('26-May-2023'),
  //     rating: 4.2
  //   }
  // ];

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(room: RoomList) {
    return this.http.delete<RoomList[]>(`/api/rooms/${room.roomNumber}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photosmeow`, {
      reportProgress: true,
    });
    return this.http.request(request);
  }

}
