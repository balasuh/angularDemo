import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { BookingComponent } from '../booking.component';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// export const bookingGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
export const BookingGuard: CanDeactivateFn<BookingComponent> = (
  component: BookingComponent, 
  currentRoute: ActivatedRouteSnapshot, 
  currentState: RouterStateSnapshot, 
  nextState?: RouterStateSnapshot
  ) => {
  const snackBar = inject(MatSnackBar);  
  if (component.bookingForm.pristine){ 
    return component.bookingForm.pristine;
  } else {
    snackBar.open('You have unsaved changes!', 'DISCARD');
    return false;
}
};
