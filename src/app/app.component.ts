import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit, ElementRef, Optional, Inject } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './services/logger.service';
import { localStorageToken } from './localStorage.token';
import { InitService } from './init.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hotelInventoryApp';

  loginRole = 'admin';

  constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStorage: Storage,
  private initService: InitService,
  private router: Router
  ) {
    console.log('InitService: ', initService.config);
  }

  // @ViewChild('name', {static: true}) name!: ElementRef;

  ngOnInit(): void {
    this.loggerService?.log('AppComponent.ngOnInit()');
    // this.name.nativeElement.innerText = 'Hilton Hotel';
    this.localStorage.setItem('name', 'Hilton Hotel');
    // this.router.events.subscribe((ev) => console.log('Router Event: ', ev));
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event)=> {
      console.log('Navigation Started');
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event)=> {
      console.log('Navigation Completed');
    });
  }

  // @ViewChild('user', {read: ViewContainerRef})  vcr!: ViewContainerRef;   

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.rooms.availableRooms = 50;
  // }
}
