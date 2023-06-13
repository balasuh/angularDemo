import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { mergeMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

    get guests() {
      return this.bookingForm.get('guests') as FormArray;
    }

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    ){};


  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.formBuilder.group({
      roomId: [roomId, [Validators.required]],
      guestEmail: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email]}], 
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.validateName, CustomValidator.validateSpecialChar('*')]],
      address: this.formBuilder.group({
        addressLine1: ['', {validators: [Validators.required]}],
        addressLine2: [''],
        city: ['', {validators: [Validators.required]}],
        state: [''],
        country: [''],
        zipCode: ['', {validators: [Validators.required]}],
      }),
      guests:this.formBuilder.array([this.formBuilder.group({
          guestName: ['', {validators: [Validators.required]}],
          age: [''],
        })
      ]),
      tnc: new FormControl(false, {validators: [Validators.requiredTrue]}),
      // guestList: Guest[]
    }, {updateOn: 'blur', validators: [CustomValidator.validateDate]});
    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data)=> {
    //   console.log('Form Data:', data);
    //   this.bookingService.bookRoom((data).subscribe((data: any) => {console.log(data)}));
    // });

    this.bookingForm.valueChanges.pipe(
      mergeMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data));
  }

  addBooking() {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {console.log(data)})
    this.bookingForm.reset({
      roomId: roomId,
      guestEmail: '', 
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: this.formBuilder.group({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      }),
      guests:[],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(this.formBuilder.group({
        guestName: ['', {validators: [Validators.required]}],
        age: [''],
      })
    )
  }

  addPassport(){
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport(){
    if(this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
     }
  }

  removeGuest(guest: any){
    this.guests.removeAt(guest);
  }

  getBookingData(){
    const roomId = this.route.snapshot.paramMap.get('roomid');
    // this.bookingForm.setValue({
    this.bookingForm.patchValue({
      roomId: roomId,
      guestEmail: 'test@test.com', 
      checkinDate: new Date('06-Jun-2023'),
      checkoutDate: new Date('08-Jun-2023'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: this.formBuilder.group({
        addressLine1: 'meow',
        addressLine2: '',
        city: 'meow',
        state: 'meow',
        country: '',
        zipCode: '250',
      }),
      guests:[],
      tnc: false,
    })
  }
  

}