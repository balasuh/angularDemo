import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidator {

    static validateName(control: AbstractControl) {
        const value = control.value as string;
        if(value.includes('test')) {
            return {
                invalidName: true
            }
        }
        return null;
    }

    static validateSpecialChar(char: string) {
        return(control: AbstractControl)  => {
        const value = control.value as string;
        if(value.includes(char)) {
            return {
                invalidSpecialChar: true
            }
        }
        return null;
    }
    }

    static validateDate(control: FormGroup) {
        const checkinDate: any = new Date(control.get('checkinDate')?.value);
        const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
        const diffDate = (checkoutDate - checkinDate)
        // console.log('diffDate:', diffDate);
        // console.log('checkinDate: ', checkinDate );
        // console.log('checkoutDate: ', checkoutDate );
        if (diffDate < 0) {
            control.get('checkoutDate')?.setErrors({
                invalidDate: true
            });
            return {
                invalidDate: true
            }
        }
        return null;
        
    }
}
