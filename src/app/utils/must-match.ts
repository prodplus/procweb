import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchinControl = formGroup.controls[matchingControlName];

    if (matchinControl.errors && !matchinControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchinControl.value) {
      matchinControl.setErrors({ mustMatch: true });
    } else {
      matchinControl.setErrors(null);
    }
  };
}
