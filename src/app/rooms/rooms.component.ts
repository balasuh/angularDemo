import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, AfterViewChecked, QueryList, SkipSelf,
OnDestroy} from '@angular/core';
import { Rooms, RoomList } from './rooms.interface';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of, startWith } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';
 
@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {  

  hotelName : string = 'Hilton Hotel';
  numberOfRooms : number = 10;

  hideRooms : boolean = true;

  selectedRoom !: RoomList;
  
  title : string = 'Rooms List';

  totalBytes: number = 0;

  subscription !: Subscription;

  error$ = new Subject<string>;

  getError$ = this.error$.asObservable();

  roomList: RoomList[] = [];

  private roomListUpdated$ = new Subject<RoomList[]>();


  rooms$ = this.roomListUpdated$.pipe(
    startWith(this.roomList), // Emit the initial room list
    catchError(err => {
      this.error$.next(err.message);
      return of([]);
    })
  );

  // // rooms$ = this.roomsService.getRooms$.pipe(
  // rooms$ = this.roomsService.getRooms()
  // .pipe(
  //   catchError(err => {
  //     // console.log(err);
  //     this.error$.next(err.message);
  //     return of([]);
  //   })
  // );

  // roomsCount$ = this.roomsService.getRooms$.pipe(
  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms().pipe( 
    map((rooms) => rooms.length)
  );

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Updated Rooms List";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: 4,
      roomType: 'Deluxe Room',
      amenities: 'AirCon, Wifi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      checkinTime: new Date('28-May-2023'),
      checkoutTime: new Date('29-May-2023'),
      rating: 2.6
    }


    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.subscription = this.roomsService.addRoom(room).subscribe((data) => {
        this.roomList = data;
        this.roomListUpdated$.next(this.roomList);
        this.roomsCount$ = this.roomsService.getRooms().pipe( 
          map((rooms) => rooms.length));
    //     console.log('***********', this.roomList, '*********');
    //     // this.cd.detectChanges(); // manually trigger change detection
    //   // this.roomList = [...this.roomList, ...data];
    //   this.roomList.push(room);
    });
    // this.roomList.push(room);
  }

  editRoom() {

    const room: RoomList = {
      roomNumber: 2,
      roomType: 'Edited Deluxe Room',
      amenities: 'AirCon, Wifi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      checkinTime: new Date('28-May-2023'),
      checkoutTime: new Date('29-May-2023'),
      rating: 2.6
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
      this.roomListUpdated$.next(this.roomList);
      this.roomsCount$ = this.roomsService.getRooms().pipe( 
    map((rooms) => rooms.length));
    });

  }

  deleteRoom() {

    const room: RoomList = {
      roomNumber: 3,
      roomType: 'Edited Deluxe Room',
      amenities: 'AirCon, Wifi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      checkinTime: new Date('28-May-2023'),
      checkoutTime: new Date('29-May-2023'),
      rating: 2.6
    };

    this.roomsService.deleteRoom(room).subscribe((data) => {
      this.roomList = data;
      this.roomListUpdated$.next(this.roomList);
      this.roomsCount$ = this.roomsService.getRooms().pipe( 
        map((rooms) => (rooms.length-1)));
    });

  }

  rooms: Rooms = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }

  stream = new Observable <any> (observer => { 
    observer.next('user1'); 
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    observer.error('observable Error');
  });

  @ViewChild(HeaderComponent) headerComponent !: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent !: QueryList<HeaderComponent>;  

  // roomService = new RoomsService(); // For dependency injection, you do not create a new instance of a class

  constructor(@SkipSelf() private roomsService: RoomsService,
  private configService: ConfigService) {

  }
  
  ngOnInit(): void {
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Stream complete!'),
      error: (err) => console.log(err)
    });
    this.roomsService.getRooms().subscribe(rooms => {
    // this.roomsService.getRooms$.subscribe(rooms => {
      this.roomList = rooms;
      this.roomListUpdated$.next(this.roomList);
    });

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('You have successfully requested for photos.');
          break;
        }

        case HttpEventType.ResponseHeader: {
          console.log('Your request for photos was successful!');
          break;
        }

        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }

        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }

        default: {
          console.log('Your Photos request failed!');
        }


      }
    })
  }
  
  // ngDoCheck(): void {
  //   console.log('Do Check is called.')
  // }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Welcome to the Hilton Hotel';
    this.headerChildrenComponent.last.title = "Last Title";
    console.log(this.headerChildrenComponent);
  }

  ngAfterViewChecked(): void {
    
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
