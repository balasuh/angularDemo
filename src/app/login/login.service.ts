import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;

  isAdmin: boolean = false;

  constructor() { }
  login(email : string, password: string) {
    if (email === "admin@hemanth.net" && password === 'miyu') {
      this.isLoggedIn = true;
      this.isAdmin=true;
      // this.route.navigate(['/rooms', 'add']);
      // this.route.navigateByUrl('/rooms/add');
    }
    else if (email === "user@hemanth.net" && password === 'miyu') {
      this.isLoggedIn=true;
      this.isAdmin=false;
    }
    return this.isLoggedIn;
  }
}
