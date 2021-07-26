import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[compare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ComparateValidatorDirective, multi: true }]
})
export class ComparateValidatorDirective implements Validator {

  @Input('compare') controlNameToCompare= <string>{};


 validate(c: AbstractControl): ValidationErrors | null {

  if (c.value === null) {
     return null;
   } else {
     if (c.value.length === 0  ) {
      return null;
     }
   }
   const controlToCompare = c.root.get(this.controlNameToCompare);
   if (controlToCompare) {
     const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
       c.updateValueAndValidity();
       subscription.unsubscribe();
     });
   }

   return controlToCompare && controlToCompare.value !== c.value ? {'compare': true } : null;

 }
}
