import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static minChildren(amount: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as any;
      if (!(formArray instanceof FormArray)) return null;

      if (formArray.controls.length < amount) {
        return { minChildren: true };
      }
      return null;
    };
  }
  static minChildrenFilled(amount: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      if (!(formArray instanceof FormArray)) return null;

      if (formArray.controls.length < amount) {
        return { minChildrenFilled: true };
      }
      if (formArray.controls.reduce((amountValid, v) => (v.value ? amountValid + 1 : amountValid), 0) < amount) {
        return { minChildrenFilled: true };
      }
      return null;
    };
  }
}
